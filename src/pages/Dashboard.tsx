import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/styles.css";

interface DataPlan {
  planSize: string;
  price: number;
  validity: number;
}

interface NetworkPlans {
  SME: DataPlan[];
  GIFTING: DataPlan[];
  "Corporate Gifting": DataPlan[];
}

// Load stored data plans or use defaults
const getStoredPlans = (): Record<string, NetworkPlans> => {
  const defaultPlans: Record<string, NetworkPlans> = {
    Airtel: {
      SME: [
        { planSize: "1GB", price: 300, validity: 7 },
        { planSize: "2GB", price: 500, validity: 14 },
      ],
      GIFTING: [
        { planSize: "500MB", price: 200, validity: 3 },
        { planSize: "1.5GB", price: 600, validity: 30 },
      ],
      "Corporate Gifting": [
        { planSize: "5GB", price: 2000, validity: 30 },
        { planSize: "10GB", price: 3500, validity: 60 },
      ],
    },
    MTN: {
      SME: [
        { planSize: "1GB", price: 500, validity: 7 },
        { planSize: "3GB", price: 1000, validity: 30 },
      ],
      GIFTING: [
        { planSize: "750MB", price: 300, validity: 7 },
        { planSize: "2GB", price: 700, validity: 30 },
      ],
      "Corporate Gifting": [
        { planSize: "5GB", price: 2500, validity: 30 },
        { planSize: "10GB", price: 5000, validity: 60 },
      ],
    },
    "9mobile": {
      SME: [],
      GIFTING: [],
      "Corporate Gifting": [],
    },
    Glo: {
      SME: [],
      GIFTING: [],
      "Corporate Gifting": [],
    },
  };

  const storedPlans = localStorage.getItem("dataPlans");
  return storedPlans ? JSON.parse(storedPlans) : defaultPlans;
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [planCategory, setPlanCategory] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const [dataPlans, setDataPlans] = useState<Record<string, NetworkPlans>>(getStoredPlans());

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("dataPlans", JSON.stringify(dataPlans));
  }, [dataPlans]);

  // Check if user is Admin or Editor
  const isAdminOrEditor = user?.role === "Admin" || user?.role === "Editor";

  // State for new plan (for adding new plans)
  const [newPlan, setNewPlan] = useState<DataPlan>({
    planSize: "",
    price: 0,
    validity: 0,
  });

  const addPlan = () => {
    if (selectedNetwork && planCategory) {
      setDataPlans((prevPlans) => {
        const updatedPlans = { ...prevPlans };
        // Assert planCategory as key of NetworkPlans
        const category = planCategory as keyof NetworkPlans;
        updatedPlans[selectedNetwork][category].push(newPlan);
        return updatedPlans;
      });
      setNewPlan({ planSize: "", price: 0, validity: 0 });
    }
  };

  const editPlan = (index: number) => {
    if (selectedNetwork && planCategory) {
      const category = planCategory as keyof NetworkPlans;
      const currentPlan = dataPlans[selectedNetwork][category][index];
      const editedPlan = prompt(
        "Enter new plan details (size, price, validity) separated by commas",
        `${currentPlan.planSize},${currentPlan.price},${currentPlan.validity}`
      );
      if (editedPlan) {
        const [size, price, validity] = editedPlan.split(",");
        setDataPlans((prevPlans) => {
          const updatedPlans = { ...prevPlans };
          updatedPlans[selectedNetwork][category][index] = {
            planSize: size.trim(),
            price: parseInt(price.trim()),
            validity: parseInt(validity.trim()),
          };
          return updatedPlans;
        });
      }
    }
  };

  const deletePlan = (index: number) => {
    if (selectedNetwork && planCategory) {
      const category = planCategory as keyof NetworkPlans;
      setDataPlans((prevPlans) => {
        const updatedPlans = { ...prevPlans };
        updatedPlans[selectedNetwork][category].splice(index, 1);
        return updatedPlans;
      });
    }
  };

  const handleCompleteOrder = () => {
    if (selectedPlan && phoneNumber) {
      alert(
        `📢 Payment Summary\n\n` +
          `📞 Phone Number: ${phoneNumber}\n` +
          `📦 Plan: ${selectedPlan.planSize}\n` +
          `💰 Price: ₦${selectedPlan.price}\n` +
          `⏳ Validity: ${selectedPlan.validity} days\n\n` +
          `✅ Order Successful! ${phoneNumber} has received ${selectedPlan.planSize} of data. Happy Browsing!`
      );
    } else {
      alert("⚠️ Please select a data plan and enter a phone number before proceeding.");
    }
  };
  

  return (
    <div>
      <h1>Select Your Network</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        {["Airtel", "MTN", "9mobile", "Glo"].map((network) => (
          <button
            key={network}
            onClick={() => {
              setSelectedNetwork(network);
              setPlanCategory(null);
              setSelectedPlan(null);
            }}
            style={{
              padding: "10px",
              background: selectedNetwork === network ? "blue" : "gray",
              color: "white",
            }}
          >
            {network}
          </button>
        ))}
      </div>

      {selectedNetwork && (
        <>
          <h2>Enter Phone Number</h2>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />

          <h2>Select Data Plan Type</h2>
          <div>
            {["SME", "GIFTING", "Corporate Gifting"].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setPlanCategory(category);
                  setSelectedPlan(null);
                }}
                style={{
                  padding: "10px",
                  background: planCategory === category ? "blue" : "gray",
                  color: "white",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {planCategory && selectedNetwork in dataPlans && (
            <>
              <h2>Select Data Plan</h2>
              <div>
                {(dataPlans[selectedNetwork][planCategory as keyof NetworkPlans] as DataPlan[]).map(
                  (plan: DataPlan, index: number) => (
                    <div key={plan.planSize}>
                      <button
                        onClick={() => setSelectedPlan(plan)}
                        style={{
                          padding: "10px",
                          background:
                            selectedPlan?.planSize === plan.planSize ? "blue" : "gray",
                          color: "white",
                        }}
                      >
                        {plan.planSize} - ₦{plan.price}
                      </button>
                      {isAdminOrEditor && (
                        <>
                          <button onClick={() => editPlan(index)}>✏️ Edit</button>
                          <button onClick={() => deletePlan(index)}>🗑️ Delete</button>
                        </>
                      )}
                    </div>
                  )
                )}
              </div>

              {isAdminOrEditor && (
                <div>
                  <h3>Add New Plan</h3>
                  <input
                    type="text"
                    placeholder="Size (e.g., 5GB)"
                    value={newPlan.planSize}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, planSize: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newPlan.price}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, price: parseInt(e.target.value) })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Validity (days)"
                    value={newPlan.validity}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        validity: parseInt(e.target.value),
                      })
                    }
                  />
                  <button onClick={addPlan}>➕ Add Plan</button>
                </div>
              )}
            </>
          )}

          {selectedPlan && (
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <h2>Payment Summary</h2>
              <p>PhoneNumber: {phoneNumber}</p>
              <p>Plan: {selectedPlan.planSize}</p>
              <p>Price: ₦{selectedPlan.price}</p>
              <p>Validity: {selectedPlan.validity} days</p>
              <button onClick={handleCompleteOrder}>Complete Order</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
