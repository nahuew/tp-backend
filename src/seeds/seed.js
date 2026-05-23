import mongoose from "mongoose";
import dotenv from "dotenv";

import Job from "../models/Job.js";
import Budget from "../models/Budget.js";
import Director from "../models/Director.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("Conectado a MongoDB");

try {

    // BORRAR DATOS ANTERIORES
    await Job.deleteMany({});
    await Budget.deleteMany({});
    await Director.deleteMany({});

    console.log("Datos anteriores eliminados");

    // CREAR DIRECTORES
    const directors = await Director.insertMany([
        {
            name: "Juan Pérez",
            specialty: "Obras civiles"
        },
        {
            name: "Ana Gómez",
            specialty: "Arquitectura"
        },
        {
            name: "Juan Carlos Gutiérrez",
            specialty: "Construcción residencial"
        }
    ]);

    console.log("Directores creados");

    // CREAR OBRAS
    const jobs = await Job.insertMany([
        {
            name: "Construcción edificio",
            location: "Buenos Aires",
            director_id: directors[0]._id,
            status: "completed",
            startDate: new Date("2025-01-10"),
            estimateEndDate: new Date("2025-12-20")
        },
        {
            name: "Remodelación oficina",
            location: "Córdoba",
            director_id: directors[1]._id,
            status: "active",
            startDate: new Date("2026-06-01"),
            estimateEndDate: new Date("2026-11-15")
        },
        {
            name: "Construcción casa residencial",
            location: "Santa Fe",
            director_id: directors[2]._id,
            status: "planning",
            startDate: new Date("2027-06-01"),
            estimateEndDate: new Date("2027-11-15")
        }
    ]);

    console.log("Obras creadas");

    // CREAR PRESUPUESTOS
    await Budget.insertMany([
        {
            idCustomer: 30111222,
            nameCustomer: "Carlos Ruiz",
            amountmo: 50000,
            amountmat: 120000,
            status: "rejected",
            description: "Rechazado por cliente",
            job_id: jobs[0]._id
        },
        {
            idCustomer: 27888999,
            nameCustomer: "Lucía Fernández",
            amountmo: 40000,
            amountmat: 90000,
            status: "approved",
            description: "Aprobado por cliente",
            job_id: jobs[0]._id
        },
        {
            idCustomer: 33222111,
            nameCustomer: "Pedro López",
            amountmo: 30000,
            amountmat: 70000,
            status: "approved",
            description: "Aprobado por cliente",
            job_id: jobs[1]._id
        },
        {
            idCustomer: 30111223,
            nameCustomer: "Martin Giménez",
            amountmo: 60000,
            amountmat: 150000,
            status: "rejected",
            description: "Rechazado por cliente",
            job_id: jobs[2]._id
        },
        {
            idCustomer: 27888999,
            nameCustomer: "Lucía Fernández",
            amountmo: 40000,
            amountmat: 90000,
            status: "waiting",
            description: "Pendiente revisión",
            job_id: jobs[2]._id
        }
    ]);

    console.log("Presupuestos creados");

} catch (error) {

    console.error(error);

} finally {

    await mongoose.connection.close();

    console.log("Conexión cerrada");
}