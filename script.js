function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const heightCm = parseFloat(document.getElementById("height").value);

    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
        document.getElementById("result").innerHTML = "Please enter valid values.";
        return;
    }
    //conversion cm-m
    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(2);

    let message = `Your BMI is ${bmi}<br> `;
    if (bmi < 18.5) {
        message += `<span style="color: blue;">You're underweight.</span>`;
    } else if (bmi < 25) {
        message += `<span style="color: green;">You're normal weight.</span>`;
    } else if (bmi < 30) {
        message += `<span style="color: orange;">You're overweight.</span>`;
    } else {
        message += `<span style="color: red;">You're obese.</span>`;
    }

//display message
    document.getElementById("result").innerHTML = message;
}

//
document.addEventListener('DOMContentLoaded', function () {
    // Store user selections
    const userSelections = {
        goal: null,
        activity: null,
        challenge: null
    };

    // Setup option buttons
    setupOptionButtons('goal-options', 'goal');
    setupOptionButtons('activity-options', 'activity');
    setupOptionButtons('challenge-options', 'challenge');

    // Submit button handler
    document.getElementById('submit-btn').addEventListener('click', function () {
        if (userSelections.goal && userSelections.activity && userSelections.challenge) {
            generateRecommendations(userSelections);
            document.getElementById('result-section').style.display = 'block';
            window.scrollTo({
                top: document.getElementById('result-section').offsetTop,
                behavior: 'smooth' 
            });
        } else {
            alert('Please answer all questions to get recommendations.');
        }
    });

    // Reset button handler
    document.getElementById('reset-btn').addEventListener('click', function () {
        resetSelections();
    });

    // Helper function to setup option buttons
    function setupOptionButtons(containerId, selectionType) {
        const buttons = document.querySelectorAll(`#${containerId} .option-btn`);
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove selected class from all buttons in this group
                buttons.forEach(btn => btn.classList.remove('selected'));
                // Add selected class to clicked button
                this.classList.add('selected');
                // Store the selection
                userSelections[selectionType] = this.dataset.value;
            });
        });
    }

    // Generate recommendations based on selections
    function generateRecommendations(selections) {
        const recommendations = [];
        const container = document.getElementById('recommendations-container');
        container.innerHTML = '';

        // Goal-based recommendations
        switch (selections.goal) {
            case 'weight-loss':
                recommendations.push({
                    title: 'Nutrition for Weight Loss',
                    content: 'Focus on a calorie deficit with plenty of protein (1.6-2.2g per kg of body weight) and fiber. Reduce processed foods and sugary drinks.'
                });
                recommendations.push({
                    title: 'Exercise Strategy',
                    content: 'Combine strength training (3x/week) with moderate cardio (150+ minutes/week). HIIT workouts can be very effective.'
                });
                break;
            case 'muscle-gain':
                recommendations.push({
                    title: 'Nutrition for Muscle Growth',
                    content: 'Aim for a slight calorie surplus with 1.6-2.2g of protein per kg of body weight. Time carbs around workouts.'
                });
                recommendations.push({
                    title: 'Training Approach',
                    content: 'Focus on progressive overload with compound lifts (squats, deadlifts, bench press). Train each muscle group 2-3x/week.'
                });
                break;
            case 'stress-reduction':
                recommendations.push({
                    title: 'Mindfulness Practices',
                    content: 'Try daily meditation (10-20 minutes), deep breathing exercises, or yoga. Journaling can also help process thoughts.'
                });
                recommendations.push({
                    title: 'Lifestyle Adjustments',
                    content: 'Prioritize sleep, reduce caffeine, and schedule regular breaks during work. Nature walks are highly beneficial.'
                });
                break;
            case 'better-sleep':
                recommendations.push({
                    title: 'Sleep Hygiene',
                    content: 'Maintain consistent sleep/wake times. Keep bedroom cool (18-20°C) and dark. Avoid screens 1 hour before bed.'
                });
                recommendations.push({
                    title: 'Evening Routine',
                    content: 'Develop a relaxing pre-sleep ritual: warm bath, light reading, or gentle stretching. Limit caffeine after 2pm.'
                });
                break;
            case 'general-wellness':
                recommendations.push({
                    title: 'Balanced Nutrition',
                    content: 'Eat a variety of colorful fruits/vegetables, whole grains, lean proteins, and healthy fats. Stay hydrated.'
                });
                recommendations.push({
                    title: 'Movement Guidelines',
                    content: 'Aim for 150+ minutes of moderate activity weekly. Include strength training 2x/week and flexibility work.'
                });
                break;
        }

        // Activity level adjustments
        switch (selections.activity) {
            case 'sedentary':
                recommendations.push({
                    title: 'Starting Exercise Safely',
                    content: 'Begin with short walks (10-15 minutes) and light bodyweight exercises. Gradually increase duration and intensity.'
                });
                break;
            case 'lightly-active':
                recommendations.push({
                    title: 'Progressing Your Routine',
                    content: 'Add 1-2 more workout days per week. Try alternating cardio and strength days.'
                });
                break;
            case 'moderately-active':
                recommendations.push({
                    title: 'Optimizing Your Training',
                    content: 'Focus on workout quality and recovery. Consider periodization to prevent plateaus.'
                });
                break;
            case 'very-active':
                recommendations.push({
                    title: 'Recovery Focus',
                    content: 'Ensure adequate rest days, proper nutrition, and consider deload weeks every 4-6 weeks.'
                });
                break;
        }

        // Challenge-specific solutions
        switch (selections.challenge) {
            case 'time':
                recommendations.push({
                    title: 'Time-Efficient Solutions',
                    content: 'Try 15-20 minute HIIT workouts, meal prep on weekends, and micro-workouts throughout the day.'
                });
                break;
            case 'motivation':
                recommendations.push({
                    title: 'Staying Motivated',
                    content: 'Set specific, measurable goals. Find an accountability partner. Track progress and celebrate small wins.'
                });
                break;
            case 'knowledge':
                recommendations.push({
                    title: 'Educational Resources',
                    content: 'Follow evidence-based health professionals. Start with foundational nutrition and exercise science principles.'
                });
                break;
            case 'resources':
                recommendations.push({
                    title: 'Low-Resource Options',
                    content: 'Bodyweight exercises require no equipment. Frozen vegetables are nutritious and affordable. Public parks are great for workouts.'
                });
                break;
        }

        // Display recommendations
        recommendations.forEach(rec => {
            const div = document.createElement('div');
            div.className = 'recommendation';
            div.innerHTML = `
                <h3>${rec.title}</h3>
                <p>${rec.content}</p>
            `;
            container.appendChild(div);
        });
    }

    // Reset all selections
    function resetSelections() {
        // Clear selections object
        userSelections.goal = null;
        userSelections.activity = null;
        userSelections.challenge = null;

        // Remove selected class from all buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Hide results section
        document.getElementById('result-section').style.display = 'none';
    }
});
// medicine
function generateAdvice() {
    // Get all checked symptoms
    const symptoms = [];
    if (document.getElementById("headache").checked) symptoms.push("headache");
    if (document.getElementById("fever").checked) symptoms.push("fever");
    if (document.getElementById("cough").checked) symptoms.push("cough");
    if (document.getElementById("fatigue").checked) symptoms.push("fatigue");
    if (document.getElementById("nausea").checked) symptoms.push("nausea");
    
    // If no symptoms selected
    if (symptoms.length === 0) {
        alert("Please select at least one symptom");
        return;
    }
    
    // Generate advice based on symptoms
    let advice = "";
    
    if (symptoms.includes("headache")) {
        advice += "<p><b>For headache:</b> Take paracetamol, rest in a quiet dark room.</p>";
    }
    if (symptoms.includes("fever")) {
        advice += "<p><b>For fever:</b> Take paracetamol, drink plenty of fluids.</p>";
    }
    if (symptoms.includes("cough")) {
        advice += "<p><b>For cough:</b> Drink warm honey lemon water, consider cough syrup.</p>";
    }
    if (symptoms.includes("fatigue")) {
        advice += "<p><b>For fatigue:</b> Get adequate rest, stay hydrated.</p>";
    }
    if (symptoms.includes("nausea")) {
        advice += "<p><b>For nausea:</b> Try ginger tea, eat small bland meals.</p>";
    }
    
    // Special combinations
    if (symptoms.includes("fever") && symptoms.includes("cough")) {
        advice += "<p>⚠️ Fever with cough could indicate infection. Monitor your symptoms.</p>";
    }
    if (symptoms.includes("headache") && symptoms.includes("nausea")) {
        advice += "<p>⚠️ Headache with nausea could indicate migraine. Consider consulting a doctor.</p>";
    }
    
    // Show result
    document.getElementById("output").innerHTML = 
        "<h3>Your Health Advice:</h3>" + advice + 
        "<p><i>Note: If symptoms persist or worsen, consult a doctor.</i></p>";
    document.getElementById("output").style.display = "block";
}
// appointment
document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time-slot").value;

    
    if (name && email && phone && service && date && time) {
        alert("Appointment successfully booked!");
        
    } else {
        alert("Please fill in all fields.");
    }
});