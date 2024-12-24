window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if ("SpeechRecognition" in window) {
  const recognition = new SpeechRecognition();
  const startButton = document.getElementById("start-button");
  const responseDiv = document.getElementById("response");

  recognition.continuous = false;
  recognition.lang = "en-US";

  startButton.addEventListener("click", () => {
    recognition.start();
    responseDiv.textContent = "Listening...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    responseDiv.textContent = `You said: "${transcript}"`;
    const answer = generateResponse(transcript);
    respond(answer, transcript);
  };

  recognition.onerror = () => {
    responseDiv.textContent = "Sorry, I didn't catch that. Please try again!";
  };

  function generateResponse(input) {
    const responses = {
      hello: "Hi there! How can I assist you today?",
      "how are you": "I'm doing great, thank you for asking!",
      "what is your name": "I'm Graphie, your data science assistant.",
      "what can you do": "I can answer questions, tell jokes, and more!",
      bye: "Goodbye! Have a great day!",
      "what is the time": `The current time is ${new Date().toLocaleTimeString()}.`,
      "what is the date": `Today's date is ${new Date().toLocaleDateString()}.`,
      "tell me a joke":
        "Why don’t skeletons fight each other? They don’t have the guts!",
      "what is the weather like":
        "I can't check the weather right now, but I recommend a weather app!",
      "who created you":
        "I was created by two brilliant developers: Shrishti and Somya to assist with tasks.",
      "tell me a fun fact": "Did you know that octopuses have three hearts?",
      "open google": "Opening Google for you.",
      "search something": "What would you like to search for?",
      "what is the capital of france": "The capital of France is Paris.",
      "what is the tallest mountain":
        "The tallest mountain is Mount Everest, standing at 8,849 meters.",
      "who is the president of the united states":
        "The president as of 2024 is Joe Biden.",
      "can you sing": "I’m not a great singer, but I can try! La la la!",
      "tell me a quote":
        "Here's a quote for you: 'The only limit to our realization of tomorrow is our doubts of today.' - FDR",
      "how old are you": "I’m as young as the code that created me!",
      "do you like humans": "I think humans are wonderful creators!",
      "what is gravity":
        "Gravity is a force that pulls objects towards the center of the Earth.",
      "why is the sky blue":
        "The sky appears blue because of the scattering of sunlight by the atmosphere.",
      "what is pi":
        "Pi is approximately 3.14159, the ratio of a circle's circumference to its diameter.",
      "who discovered electricity":
        "Benjamin Franklin is often credited with discovering electricity.",
      "tell me another joke":
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "what is the speed of light":
        "The speed of light is about 299,792 kilometers per second.",
      "tell me a riddle":
        "What has to be broken before you can use it? An egg!",
      "what is the meaning of life":
        "Philosophers say the meaning of life is to find happiness and purpose.",
      "who is albert einstein":
        "Albert Einstein was a physicist famous for his theory of relativity.",
      "what is photosynthesis":
        "Photosynthesis is how plants convert sunlight into energy.",
      "tell me a tongue twister":
        "Sure! Peter Piper picked a peck of pickled peppers.",
      "can you dance": "I can’t dance, but I can cheer you on!",
      "how far is the sun":
        "The sun is about 93 million miles away from Earth.",
      "what is the largest ocean":
        "The Pacific Ocean is the largest ocean on Earth.",
      "what is a black hole":
        "A black hole is a region where gravity is so strong that nothing can escape.",
      "how many continents are there": "There are seven continents on Earth.",
      "what is the smallest country":
        "Vatican City is the smallest country in the world.",
      "tell me a proverb": "Here's a proverb: 'A stitch in time saves nine.'",
      "what is an atom": "An atom is the smallest unit of matter.",
      "what is dna": "DNA carries genetic instructions for life.",
      "who invented the telephone":
        "Alexander Graham Bell invented the telephone.",
      "tell me a bedtime story": "Once upon a time, in a land far, far away...",
      "what is artificial intelligence":
        "AI simulates human intelligence in machines.",
      "what is machine learning":
        "Machine Learning is a branch of AI where machines learn from data.",
      "what is the moon made of": "The moon is made of rock and dust.",
      "why do we sleep":
        "Sleep helps the body recover and process information.",
      "what is the milky way":
        "The Milky Way is the galaxy that contains our solar system.",
      "what is a computer":
        "A computer is a device that processes data and performs calculations.",
      "what is energy": "Energy is the ability to do work or cause change.",
      "what is a galaxy":
        "A galaxy is a system of stars, gas, and dust bound by gravity.",
      "what is your favorite color":
        "I don't have a favorite color, but I think blue is cool!",
      "who is the current ceo of tesla": "The CEO of Tesla is Elon Musk.",

      "what is graph expert":
        "GraphXpert is an innovative tool designed to simplify data analysis and visualization. Whether you are a business analyst, data scientist, or just someone who enjoys working with data, GraphXpert provides powerful tools to create insightful visualizations from your data sets",

      "what is data science":
        "Data Science is a multidisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.",
      "what is machine learning":
        "Machine Learning is a branch of artificial intelligence that enables machines to learn from data and improve from experience without being explicitly programmed.",
      "what is deep learning":
        "Deep Learning is a subset of Machine Learning that uses neural networks with many layers (hence 'deep') to model complex patterns in large amounts of data.",
      "what is data analysis":
        "Data Analysis is the process of inspecting, cleaning, transforming, and modeling data to discover useful information, draw conclusions, and support decision-making.",
      "what is artificial intelligence":
        "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think, learn, and problem-solve like humans.",
      "what is the difference between data science and data analysis":
        "Data Science is a broader field that includes data analysis but also focuses on building algorithms, predictive models, and machine learning systems. Data Analysis focuses more on interpreting and visualizing existing data.",
      "what is the mean in statistics":
        "The mean is the average of a set of numbers, calculated by dividing the sum of all the numbers by the number of numbers.",
      "what is the median in statistics":
        "The median is the middle value of a data set when it is ordered from least to greatest. If there is an even number of values, the median is the average of the two middle numbers.",
      "what is the mode in statistics":
        "The mode is the value that appears most frequently in a data set.",
      "what is standard deviation":
        "Standard deviation is a measure of the amount of variation or dispersion in a set of values. A low standard deviation means the values are close to the mean, while a high standard deviation indicates the values are spread out.",
      "what is regression analysis":
        "Regression analysis is a statistical method used to examine the relationship between two or more variables. It helps predict the value of one variable based on the value of another.",
      "what is classification in machine learning":
        "Classification is a type of supervised learning where the model is trained to predict the category or class of an input based on labeled data.",
      "what is clustering in machine learning":
        "Clustering is an unsupervised learning technique that groups similar data points together based on their characteristics, without using predefined labels.",
      "what is overfitting in machine learning":
        "Overfitting occurs when a model learns the details and noise in the training data to the extent that it negatively impacts the model's performance on new data.",
      underfitting:
        "Underfitting occurs when a model is too simple to capture the underlying patterns in the data, leading to poor performance on both the training and test data.",
      "neural network":
        "A neural network is a series of algorithms that attempt to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.",
      "decision tree":
        "A decision tree is a supervised learning algorithm used for classification and regression tasks. It splits the data into subsets based on the most significant feature and repeats this process recursively.",
      "what is the difference between supervised and unsupervised learning":
        "Supervised learning involves training a model on labeled data, while unsupervised learning works with unlabeled data, aiming to find hidden patterns or groupings.",
      "what is a random forest":
        "A random forest is an ensemble learning method that combines multiple decision trees to improve prediction accuracy and control overfitting.",
      "what is the confusion matrix":
        "The confusion matrix is a table used to evaluate the performance of a classification model by showing the true positives, true negatives, false positives, and false negatives.",
      "what is cross-validation":
        "Cross-validation is a technique used to assess the performance of a machine learning model by splitting the data into several subsets and testing the model on each subset in turn.",
      "what is bias-variance tradeoff":
        "The bias-variance tradeoff is the balance between a model's complexity (variance) and its ability to generalize to new data (bias). Models that are too complex may overfit (high variance), while too simple models may underfit (high bias).",
      "what is natural language processing (NLP)":
        "Natural Language Processing (NLP) is a branch of AI that focuses on enabling machines to understand and process human language, including speech and text.",
      "what is reinforcement learning":
        "Reinforcement Learning is a type of machine learning where an agent learns to make decisions by performing actions and receiving rewards or penalties.",
      "what is the ROC curve":
        "The Receiver Operating Characteristic (ROC) curve is a graphical representation used to evaluate the performance of a classification model by plotting the true positive rate against the false positive rate.",
      "what is precision in machine learning":
        "Precision is a performance metric for classification models that measures the ratio of true positive predictions to the total predicted positives.",
      "what is recall in machine learning":
        "Recall is a performance metric for classification models that measures the ratio of true positive predictions to the total actual positives.",
      "what is F1 score":
        "The F1 score is the harmonic mean of precision and recall, providing a single metric to evaluate a classification model's performance, especially when there is an imbalance between classes.",
      "what is dimensionality reduction":
        "Dimensionality reduction is the process of reducing the number of input variables in a dataset, often using techniques like PCA (Principal Component Analysis) or t-SNE, to improve model performance and visualization.",
      "what is PCA (Principal Component Analysis)":
        "Principal Component Analysis (PCA) is a statistical technique used for dimensionality reduction by transforming data into a smaller set of uncorrelated variables called principal components.",
      "what is t-SNE":
        "t-SNE (t-distributed Stochastic Neighbor Embedding) is a machine learning algorithm used for dimensionality reduction, particularly for visualizing high-dimensional data.",
      "what is the difference between a sample and a population in statistics":
        "A population is the entire set of data or observations, while a sample is a smaller subset of the population used for analysis.",
      "what is hypothesis testing":
        "Hypothesis testing is a statistical method used to determine if there is enough evidence in a sample of data to support a particular hypothesis about a population.",
      "what is A/B testing":
        "A/B testing is a statistical method used to compare two versions of something (like a website or an app) to determine which one performs better based on a predefined metric.",

      "what is mean":
        "The mean is the average of a set of numbers, calculated by dividing the sum of all the numbers by the number of numbers.",
      "what is median":
        "The median is the middle value of a data set when it is ordered from least to greatest. If there is an even number of values, the median is the average of the two middle numbers.",
      "what is mode":
        "The mode is the value that appears most frequently in a data set.",
      "what is range":
        "The range is the difference between the highest and lowest values in a data set. It is calculated by subtracting the minimum value from the maximum value.",
      "what is variance":
        "Variance measures how far each number in a set is from the mean. It is calculated by averaging the squared differences between each number and the mean.",
      "what is standard deviation":
        "Standard deviation is a measure of the amount of variation or dispersion in a set of values. A low standard deviation means the values are close to the mean, while a high standard deviation indicates the values are spread out.",
      "what is skewness":
        "Skewness measures the asymmetry of a data set. A positive skew indicates that the data is skewed to the right, while a negative skew indicates it is skewed to the left.",
      "what is kurtosis":
        "Kurtosis measures the 'tailedness' of the probability distribution of a data set. High kurtosis indicates more extreme outliers, while low kurtosis indicates fewer extreme outliers.",
      "what is probability":
        "Probability is the measure of the likelihood that a given event will occur. It is expressed as a number between 0 and 1, where 0 means impossible and 1 means certain.",
      "what is a normal distribution":
        "A normal distribution is a probability distribution that is symmetric about the mean. Most of the values cluster around the mean, and it follows the 68-95-99.7 rule (68% within one standard deviation, 95% within two, 99.7% within three).",
      "what is a binomial distribution":
        "A binomial distribution models the number of successes in a fixed number of independent trials, each with the same probability of success. It is used for yes/no type outcomes.",
      "what is correlation":
        "Correlation is a statistical measure that describes the relationship between two variables. It can be positive, negative, or zero, indicating how variables change in relation to each other.",
      "what is covariance":
        "Covariance is a measure of how two variables change together. A positive covariance indicates that the variables tend to increase or decrease together, while a negative covariance means one increases while the other decreases.",
      "what is linear regression":
        "Linear regression is a statistical method for modeling the relationship between a dependent variable and one or more independent variables by fitting a linear equation to the observed data.",
      "what is logistic regression":
        "Logistic regression is a type of regression analysis used for prediction of outcome variables that are categorical, often used for binary classification tasks.",
      "what is a z-score":
        "A z-score, or standard score, indicates how many standard deviations a data point is from the mean. It is calculated by subtracting the mean from the data point and dividing by the standard deviation.",
      "what is an outlier":
        "An outlier is a data point that is significantly different from the other points in a dataset. Outliers can be unusually high or low values that may skew analysis.",
      "what is a box plot":
        "A box plot is a graphical representation of a dataset that displays its minimum, first quartile, median, third quartile, and maximum, helping to identify the distribution and outliers in the data.",
      "what is a histogram":
        "A histogram is a graphical representation of the distribution of numerical data, where the data is divided into bins, and the frequency of data points in each bin is shown as bars.",
      "what is a scatter plot":
        "A scatter plot is a graph used to represent the relationship between two numerical variables by plotting data points on a two-dimensional grid.",
      "what is a confidence interval":
        "A confidence interval is a range of values, derived from sample data, that is likely to contain the value of an unknown population parameter, with a certain level of confidence (e.g., 95%).",
      "what is hypothesis testing":
        "Hypothesis testing is a statistical method used to determine if there is enough evidence in a sample of data to support a particular hypothesis about a population.",
      "what is p-value":
        "The p-value is the probability that the observed results of an experiment or study could have occurred under the null hypothesis. A smaller p-value suggests stronger evidence against the null hypothesis.",
      "what is a t test":
        "A t-test is a statistical test used to compare the means of two groups to determine if there is a significant difference between them.",
      "what is an ANOVA test":
        "ANOVA (Analysis of Variance) is a statistical method used to determine whether there are any statistically significant differences between the means of three or more groups.",
      "what is the chi-square test":
        "The chi-square test is used to determine if there is a significant association between two categorical variables.",
      "what is a Bernoulli trial":
        "A Bernoulli trial is a random experiment with exactly two possible outcomes: success or failure, often used in probability theory.",
      "Poisson distribution":
        "The Poisson distribution models the number of times an event occurs in a fixed interval of time or space, given the event occurs with a known constant rate and independently of the time since the last event.",
      "what is Bayes' Theorem":
        "Bayes' Theorem is a principle in probability theory that describes how to update the probability of a hypothesis based on new evidence.",
      "what is a sampling distribution":
        "A sampling distribution is the probability distribution of a given statistic (like the mean) obtained from a large number of samples from a population.",
      "what is a null hypothesis":
        "The null hypothesis is a type of hypothesis used in statistics that suggests there is no effect or no relationship between variables in a study. It is tested against the alternative hypothesis.",
      "what is an alternative hypothesis":
        "The alternative hypothesis is a hypothesis that suggests there is an effect or a relationship between variables, as opposed to the null hypothesis.",
      "what is simple interest":
        "Simple interest is calculated on the original amount of money (principal) that is invested or borrowed, typically expressed as a percentage of the principal over a period of time.",
      "what is compound interest":
        "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods.",
      "what is a vector":
        "A vector is a quantity that has both magnitude and direction, often used in mathematics and physics to represent points, displacement, or force.",
      "what is a matrix":
        "A matrix is a rectangular array of numbers arranged in rows and columns, used in mathematics to represent data, transformations, and systems of linear equations.",
      "what is the determinant of a matrix":
        "The determinant of a matrix is a scalar value that can be computed from its elements, and it provides important properties of the matrix, such as invertibility.",
      "what is eigenvalue":
        "An eigenvalue is a scalar that characterizes the scale of a transformation represented by a matrix. It is associated with an eigenvector, which remains in the same direction after the transformation.",
      "what is the quadratic formula":
        "The quadratic formula is used to find the solutions of a quadratic equation in the form ax^2 + bx + c = 0, and is given by x = (-b ± √(b² - 4ac)) / 2a.",
    };

    if (input.startsWith("open ")) {
      return "Opening the website you requested.";
    }

    for (let key in responses) {
      if (input.includes(key)) {
        return responses[key];
      }
    }

    return "I'm not sure how to respond to that. Maybe try rephrasing your question!";
  }

  function respond(message, transcript) {
    responseDiv.textContent = message;

    if (transcript.startsWith("open ")) {
      const website = transcript.replace("open ", "").trim();
      const websiteMap = {
        google: "https://www.google.com",
        youtube: "https://www.youtube.com",
        facebook: "https://www.facebook.com",
        twitter: "https://www.twitter.com",
        github: "https://www.github.com",
        linkedin: "https://www.linkedin.com",
        stackoverflow: "https://stackoverflow.com",
      };

      if (websiteMap[website]) {
        window.open(websiteMap[website], "_blank");
      } else {
        window.open(`https://${website}.com`, "_blank");
      }
    }

    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }
} else {
  const responseDiv = document.getElementById("response");
  responseDiv.textContent =
    "Sorry, your browser doesn't support the Web Speech API.";
}
