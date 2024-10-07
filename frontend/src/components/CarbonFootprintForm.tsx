import React, { useState } from 'react';
import axios from 'axios';


interface Transport {
  type: string;
  distance: number;
}

interface Food {
  type: string;
  amount: number;
}

interface Waste {
  type: string;
  amount: number;
}

interface Goods {
  category: string;
  noOfUnit: number;
}

interface UserInput {
  electricityConsumption: number;
  gasConsumption: number;
  publicTransport: Transport[];
  privateTransport: Transport[];
  foodConsumption: Food[];
  wasteProduction: Waste[];
  goodsServices: Goods[];
}

const CarbonCalculator: React.FC = () => {
  const userID: number = 1;
  const [userInput, setUserInput] = useState<UserInput>({
    electricityConsumption: 0,
    gasConsumption: 0,
    publicTransport: [{ type: '', distance: 0 }],
    privateTransport: [{ type: '', distance: 0 }],
    foodConsumption: [{ type: '', amount: 0 }],
    wasteProduction: [{ type: '', amount: 0 }],
    goodsServices: [{ category: '', noOfUnit: 0 }],
  });

  const [totalEmissions, setTotalEmissions] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    index: number,
    subField: string
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;

    setUserInput((prev) => {
      const newState = { ...prev };
      if (Array.isArray(newState[field as keyof UserInput])) {
        (newState[field as keyof UserInput] as any)[index][subField] = value;
      } else {
        newState[field as keyof UserInput] = value as never;
      }
      return newState;
    });
  };


  const addField = (field: string) => {
    setUserInput((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof UserInput] as never), {}],
    }));
  };


  const calculateEmissions = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:3000/calculate/${userID}`, userInput);
      setTotalEmissions((response.data.totalEmissions)/1000);
    } catch (error) {
      console.error('Error calculating emissions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-8 bg-gray-100 min-h-screen">

      <div className="w-1/2 pr-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Track Your Carbon Footprint!</h1>
        <p className="text-lg text-gray-600">
          Every small step you take towards reducing your carbon emissions counts. Join us in making the planet a cleaner, greener place for future generations!
        </p>
      </div>

      <div className="w-1/2">
        <div className="carbon-calculator p-8 bg-white rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Carbon Emission Calculator</h2>

          <form className="space-y-6">
            {/* Electricity and Gas Consumption Side by Side */}
            <div className="flex justify-between space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Electricity Consumption (kWh):</label>
                <input
                  type="number"
                  value={userInput.electricityConsumption}
                  onChange={(e) => handleInputChange(e, 'electricityConsumption', 0, '')}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Gas Consumption (Cubic meters):</label>
                <input
                  type="number"
                  value={userInput.gasConsumption}
                  onChange={(e) => handleInputChange(e, 'gasConsumption', 0, '')}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Public Transport:</label>
              {userInput.publicTransport.map((transport, index) => (
                <div key={index} className="flex mb-2 space-x-4">
                  <select
                    value={transport.type}
                    onChange={(e) => handleInputChange(e, 'publicTransport', index, 'type')}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                  >
                    <option value="">Select Type</option>
                    <option value="CAR">Car</option>
                    <option value="BUS">Bus</option>
                    <option value="Train">Train</option>

                  </select>
                  <input
                    type="number"
                    value={transport.distance}
                    onChange={(e) => handleInputChange(e, 'publicTransport', index, 'distance')}
                    placeholder="Distance (km)"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button type="button" onClick={() => addField('publicTransport')} className="text-blue-600 underline">
                + Add Public Transport
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Private Transport:</label>
              {userInput.privateTransport.map((transport, index) => (
                <div key={index} className="flex mb-2 space-x-4">
                  <select
                    value={transport.type}
                    onChange={(e) => handleInputChange(e, 'privateTransport', index, 'type')}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                  >
                    <option value="">Select Type</option>
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="CNG">CNG</option>
                  </select>
                  <input
                    type="number"
                    value={transport.distance}
                    onChange={(e) => handleInputChange(e, 'privateTransport', index, 'distance')}
                    placeholder="Distance (km)"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button type="button" onClick={() => addField('privateTransport')} className="text-blue-600 underline">
                + Add Private Transport
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Food Consumption:</label>
              {userInput.foodConsumption.map((food, index) => (
                <div key={index} className="flex mb-2 space-x-4">
                  <select
                    value={food.type}
                    onChange={(e) => handleInputChange(e, 'foodConsumption', index, 'type')}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                  >
                    <option value="">Select Type</option>
                    <option value="MEAT">Meat</option>
                    <option value="DAIRY">Dairy</option>
                    <option value="VEGETABLES">Vegetables</option>
                    <option value="GRAINS">Grains</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <input
                    type="number"
                    value={food.amount}
                    onChange={(e) => handleInputChange(e, 'foodConsumption', index, 'amount')}
                    placeholder="Amount (kg)"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button type="button" onClick={() => addField('foodConsumption')} className="text-blue-600 underline">
                + Add Food Consumption
              </button>
            </div>


            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Waste Production:</label>
              {userInput.wasteProduction.map((waste, index) => (
                <div key={index} className="flex mb-2 space-x-4">
                  <select
                    value={waste.type}
                    onChange={(e) => handleInputChange(e, 'wasteProduction', index, 'type')}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                  >
                    <option value="">Select Type</option>
                    <option value="PAPER">Paper</option>
                    <option value="PLASTIC">Plastic</option>
                    <option value="ORGANIC">Organic</option>
                    <option value="GLASS">Glass</option>
                    <option value="METAL">Metal</option>
                  </select>
                  <input
                    type="number"
                    value={waste.amount}
                    onChange={(e) => handleInputChange(e, 'wasteProduction', index, 'amount')}
                    placeholder="Amount (kg)"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button type="button" onClick={() => addField('wasteProduction')} className="text-blue-600 underline">
                + Add Waste Production
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Goods and Services:</label>
              {userInput.goodsServices.map((goods, index) => (
                <div key={index} className="flex mb-2 space-x-4">
                  <select
                    value={goods.category}
                    onChange={(e) => handleInputChange(e, 'goodsServices', index, 'category')}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                  >
                    <option value="">Select Category</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="FURNITURE">Furniture</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <input
                    type="number"
                    value={goods.noOfUnit}
                    onChange={(e) => handleInputChange(e, 'goodsServices', index, 'noOfUnit')}
                    placeholder="No. of Units"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button type="button" onClick={() => addField('goodsServices')} className="text-blue-600 underline">
                + Add Goods/Services
              </button>
            </div>


            <button
              type="button"
              onClick={calculateEmissions}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-500 transition duration-200"
            >
              {loading ? 'Calculating...' : 'Calculate Emissions'}
            </button>
          </form>

          {totalEmissions !== null && (
            <div className="mt-6 text-center text-lg font-semibold text-gray-800">
              Total Estimated Carbon Emissions: <span className="text-blue-600">{totalEmissions} ton CO2</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
