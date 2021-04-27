import { expect } from "chai";
import express from "express";
import request from "supertest";
import { bmiCategory } from '../app/app';

import app from '../app/app';

describe('POST /bmi', () => {
    it('Get count of people by BMI', (done) => {
        request(app)
            .post("/bmi")
            .send([
                {"Gender": "Male", "HeightCm": 171, "WeightKg": 96 },
                {"Gender": "Male", "HeightCm": 161, "WeightKg": 85 },
                {"Gender": "Male", "HeightCm": 180, "WeightKg": 77 },
                {"Gender": "Female", "HeightCm": 166, "WeightKg": 62},
                {"Gender": "Female", "HeightCm": 150, "WeightKg": 70},
                {"Gender": "Female", "HeightCm": 167, "WeightKg": 82},
                {"Gender": "Male", "HeightCm": 167, "WeightKg": 18},
                {"Gender": "Female", "HeightCm": 100, "WeightKg": 25},
                {"Gender": "Male", "HeightCm": 100, "WeightKg": 25},
            ])
            .expect("Content-Type", 'json')
            .expect(200, (err, response) => {
                let responseBody = response.body;
                console.log(responseBody);
                
                expect(responseBody[bmiCategory.vsobse]).to.equal(5);
                expect(responseBody[bmiCategory.sobese]).to.equal(1);
                expect(responseBody[bmiCategory.underweight]).to.equal(1);
                expect(responseBody[bmiCategory.overweight]).to.equal(2);

                done();
            });
    })
});

// {
//     "Very Severely obese": 5,
//     "Severely obese": 1,
//     "Underweight": 1,
//     "Overweight": 2
// }