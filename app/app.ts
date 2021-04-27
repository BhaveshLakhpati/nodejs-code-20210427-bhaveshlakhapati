import express from "express";
import { AddressInfo } from "net";
import { Observable, of } from "rxjs";

const app = express();
app.use(express.json());

interface PersonDetails {
    Gender: String,
    HeightCm: Number,
    WeightKg: Number
}

interface HealthDetails {
    bmi: number,
    category: string,
    risk: string
}

export const bmiCategory = {
    underweight: "Underweight",
    normal_weight: "Normal weight",
    overweight: "Overweight",
    mobese: "Moderately obese",
    sobese: "Severely obese",
    vsobse: "Very Severely obese"
}

function calculateBMI(heightInCm: Number, weight: Number): HealthDetails {
    let bmi: number = (Number(weight) * 100) / Number(heightInCm);
    // console.log(`BMI: ${bmi}, HEIGHT: ${heightInCm}, WEIGHT: ${weight}`);

    let category: String, risk: String;

    switch(true) {
        case (bmi <= 18.4):
            category = bmiCategory.underweight;
            risk = 'Malnutrition risk';
        break;
        case (bmi >= 18.5 && bmi <= 24.9):
            category = bmiCategory.normal_weight;
            risk = 'Low risk';
        break;
        case (bmi >= 25 && bmi <= 29.9):
            category = bmiCategory.overweight;
            risk = 'Enhanced risk';
        break;
        case (bmi >= 30 && bmi <= 34.9):
            category = bmiCategory.mobese;
            risk = 'Medium risk';
        break;
        case (bmi >= 35 && bmi <= 39.9):
            category = bmiCategory.sobese;
            risk = 'High risk';
        break;
        default:
            category = bmiCategory.vsobse;
            risk = 'Very high risk';
    }

    return {bmi, category, risk} as HealthDetails;
}

app.post("/bmi", (request, response) => {
    let bmiWithCategory:any = {};

    (request.body as PersonDetails[])
        .map(details => calculateBMI(details.HeightCm, details.WeightKg))
        .map(details => {
            let category: string = details.category;
            let count: number = bmiWithCategory[category];

            if(count) {
                bmiWithCategory[category] = ++count;
            } else {
                bmiWithCategory[category] = 1;
            }
        });

    response.status(200).json(bmiWithCategory);
});

const server = app.listen(8081, () => {
    const serverAddress: AddressInfo = server.address() as AddressInfo;
    console.log(`App started on ${serverAddress.address}:${serverAddress.port}`);
});

export default app;