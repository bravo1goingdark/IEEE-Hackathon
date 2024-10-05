import express from 'express';
import { PrismaClient } from '@prisma/client';

const carbonRouter = express();
const prisma = new PrismaClient();

carbonRouter.post("/user/create" , async  (req , res) => {
    
    try {
        const {name , email} = req.body;
        const doesExist = await prisma.user.findFirst({
            where :{
                email
            }
        })

        if (doesExist) {
            return res.status(400).json({
                msg : "user with this email already exist"
            })
        }
        const newUser = await prisma.user.create({
            data : {
                name ,
                email
            }
        })

        if (newUser) {
            return res.status(201).json({
                name : newUser.name ,
                email : newUser.email,
                userID : newUser.id
            });
        }
    } catch (error) {
        if (error) {
            return res.status(400).json({
                msg : "server error"
            })
        }
    }
})



carbonRouter.post('/users/:userId/footprint-records', async (req, res) => {
    const { userId } = req.params;
    const { energyConsumption, transportation, foodConsumption, wasteProduction, goodsServices } = req.body;
  
    try {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });
  
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
  
        // Calculate total emissions
        const totalEnergyEmissions = energyConsumption.reduce((total, ec) => {
            const emissionAmount = (ec.electricityKwh * 0.39) + (ec.naturalGasKwh * 2.98);
            total += emissionAmount;
            return total;
        }, 0);

        const totalTransportEmissions = transportation.reduce((total, tr) => {
            const emissionAmount = tr.distanceKm * 0.154;
            total += emissionAmount;
            return total;
        }, 0);

        const totalFoodEmissions = foodConsumption.reduce((total, fc) => {
            const emissionAmount = fc.amountKg * 0.72;
            total += emissionAmount;
            return total;
        }, 0);

        const totalWasteEmissions = wasteProduction.reduce((total, wp) => {
            const emissionAmount = wp.amountKg * 0.5;
            total += emissionAmount;
            return total;
        }, 0);

        const totalGoodsEmissions = goodsServices.reduce((total, gs) => {
            const emissionAmount = gs.noOfUnit * 200;
            total += emissionAmount;
            return total;
        }, 0);
  
        const totalEmissions = totalEnergyEmissions + totalTransportEmissions + totalFoodEmissions + totalWasteEmissions + totalGoodsEmissions;

        // Create footprint record
        const footprintRecord = await prisma.footprintRecord.create({
            data: {
                user: { connect: { id: parseInt(userId) } },
                totalEmissions,
                energyConsumption: {
                    create: energyConsumption.map(ec => ({
                        electricityKwh: ec.electricityKwh,
                        naturalGasKwh: ec.naturalGasKwh,
                        emissionAmount: (ec.electricityKwh * 0.39) + (ec.naturalGasKwh * 2.98), // Calculate emission amount
                    })),
                },
                transportation: {
                    create: transportation.map(tr => ({
                        vehicleType: tr.vehicleType,
                        distanceKm: tr.distanceKm,
                        emissionAmount: tr.distanceKm * 0.154, // Calculate emission amount
                    })),
                },
                foodConsumption: {
                    create: foodConsumption.map(fc => ({
                        foodType: fc.foodType,
                        amountKg: fc.amountKg,
                        emissionAmount: fc.amountKg * 0.7, // Calculate emission amount
                    })),
                },
                wasteProduction: {
                    create: wasteProduction.map(wp => ({
                        wasteType: wp.wasteType,
                        amountKg: wp.amountKg,
                        emissionAmount: wp.amountKg * 0.5, // Calculate emission amount
                    })),
                },
                goodsServices: {
                    create: goodsServices.map(gs => ({
                        category: gs.category,
                        noOfUnit: gs.noOfUnit,
                        emissionAmount: gs.noOfUnit * 200, // Calculate emission amount
                    })),
                },
            },
        });

        res.status(201).json({
            message: "Footprint record created successfully",
            footprintRecord,
        });
  
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

  


export default carbonRouter;