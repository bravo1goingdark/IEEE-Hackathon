// server.ts
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { calculateEmissions} from "../utils/carbon.js";
const carbonRouter = Router();
const prisma = new PrismaClient();

carbonRouter.post("/create", async (req, res) => {
  const { email } = req.body;

  const newUser = await prisma.user.create({
    data: {
      email,
    },
  });

  return res.json({
    msg : "success",
    email : newUser.email,
    id : newUser.id
  })
});

carbonRouter.post("/calculate/:userID", async (req, res) => {
  console.log(req.body);
  const {
    electricityConsumption,
    gasConsumption,
    publicTransport,
    privateTransport,
    foodConsumption,
    wasteProduction,
    goodsServices,
  } = req.body;
  const {userID} = req.params;

  await prisma.user.update({
    where: { id: parseInt(userID) },
    data: {
      electricityConsumption,
      gasConsumption,
      publicTransport: {
        create: publicTransport.map((t) => ({
          type: "PUBLIC",
          distance: t.distance,
        })),
      },
      privateTransport: {
        create: privateTransport.map((t) => ({
          type: t.type.toUpperCase(),
          distance: t.distance,
        })),
      },
      foodConsumption: {
        create: foodConsumption.map((f) => ({
          type: f.type,
          amount: f.amount,
        })),
      },
      wasteProduction: {
        create: wasteProduction.map((w) => ({
          type: w.type,
          amount: w.amount,
        })),
      },
      goodsServices: {
        create: goodsServices.map((g) => ({
          category: g.category,
          noOfUnit: g.noOfUnit,
        })),
      },
    },
  });


  const totalEmissions = await calculateEmissions(req.body);


  await prisma.user.update({
    where: { id: parseInt(userID) },
    data: {
      totalEmissions,
    },
  });

  return res.status(200).json({ totalEmissions });
});


export default carbonRouter;
