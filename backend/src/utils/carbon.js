export async function getCarbonFactors() {
  return {
    electricityKwh: 0.5, 
    naturalGasKwh: 2.0, 
    transport: {
      PUBLIC: 1.9, 
      PRIVATE: 1.38, 
    },
    food: {
      MEAT: 5.0, 
      DAIRY: 1.4,
      VEGETABLES: 2.5,
      GRAINS: 1.0,
      OTHER: 1.5,
    },
    waste: {
      PAPER: 2.5,
      PLASTIC: 2.5,
      ORGANIC: 0.5,
      GLASS: 1.0,
      METAL: 2.5,
    },
    goods: {
      CLOTHING: 15.0,
      ELECTRONICS: 150.0,
      FURNITURE: 5.0,
      OTHER: 2.5,
    },
  };
}

export async function calculateEmissions(data) {
  const carbonFactors = await getCarbonFactors();
  let totalEmissions = 0;

  totalEmissions +=
    (data.electricityConsumption || 0) * carbonFactors.electricityKwh;
  totalEmissions += (data.gasConsumption || 0) * carbonFactors.naturalGasKwh;

  for (const transport of data.publicTransport) {
    totalEmissions += transport.distance * carbonFactors.transport.PUBLIC;
  }

  for (const transport of data.privateTransport) {
    totalEmissions += transport.distance * carbonFactors.transport.PRIVATE;
  }

  for (const food of data.foodConsumption) {
    totalEmissions += food.amount * carbonFactors.food[food.type];
  }

  for (const waste of data.wasteProduction) {
    totalEmissions += waste.amount * carbonFactors.waste[waste.type];
  }

  for (const goods of data.goodsServices) {
    totalEmissions += goods.noOfUnit * carbonFactors.goods[goods.category];
  }

  return totalEmissions;
}
