import React from 'react';
import './NutritionNavigator.scss'; // Import the SCSS file

const NutritionNavigator = ({ nutritionData }) => {
  return (
    <div className="nutrition-info">
      <div className="nutrition-info-title-container">
        {/* Add SVG for icon if needed */}
        <h2 className="nutrition-info-title">Nutrition Navigator</h2>
      </div>
      <table>
        <tbody>
          {nutritionData.calorieInfo && (
            <tr>
              <td>{nutritionData.calorieInfo.mainNutrient.name}</td>
              <td>{nutritionData.calorieInfo.mainNutrient.amount}</td>
            </tr>
          )}
          {nutritionData.keyNutrients && (
            <tr>
              <td colSpan="2">Key Nutrients</td>
            </tr>
          )}
          {nutritionData.keyNutrients && nutritionData.keyNutrients.values.map((nutrient, index) => (
            <tr key={index}>
              <td>{nutrient.mainNutrient.name}</td>
              <td>{nutrient.mainNutrient.amount}</td>
            </tr>
          ))}
          {nutritionData.vitaminMinerals && (
            <tr>
              <td colSpan="2">Vitamins and Minerals</td>
            </tr>
          )}
          {nutritionData.vitaminMinerals && nutritionData.vitaminMinerals.childNutrients.map((nutrient, index) => (
            <tr key={index}>
              <td>{nutrient.name}</td>
              <td>{nutrient.amount}</td>
            </tr>
          ))}
          {nutritionData.servingInfo && (
            <tr>
              <td colSpan="2">Serving Information</td>
            </tr>
          )}
          {nutritionData.servingInfo && nutritionData.servingInfo.values.map((serving, index) => (
            <tr key={index}>
              <td>{serving.name}</td>
              <td>{serving.value}</td>
            </tr>
          ))}
          {nutritionData.additionalDisclaimer && (
            <tr>
              <td colSpan="2">Additional Disclaimer</td>
            </tr>
          )}
          {nutritionData.additionalDisclaimer && (
            <tr>
              <td colSpan="2">{nutritionData.additionalDisclaimer.value}</td>
            </tr>
          )}
          {nutritionData.staticContent && (
            <tr>
              <td colSpan="2">General Facts</td>
            </tr>
          )}
          {nutritionData.staticContent && (
            <tr>
              <td colSpan="2">{nutritionData.staticContent.value}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionNavigator;
