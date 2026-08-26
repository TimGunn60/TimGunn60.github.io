import ProjectCard from '../components/projects/ProjectCard';

function Projects() {
  const projectsData = [
  {
  id: 1,
  title: "Reinforcement Learning for Optimal Trade Execution",
  description: "Trained a PPO agent to execute large orders against historical CME ES futures order books (Databento MBP-10), using a custom Gymnasium environment. The resulting agent cut mean implementation shortfall 30.6% vs TWAP and 12.4% vs VWAP, and learned to trade passively when conditions allowed.",
  image: "/IS-graph.png",
  alternate: true
  },
  // {
  // id: 2,
  // title: "Low-Latency C++ Trading System",
  // description: "Placeholder",
  // image: "/Cpp-Trading.png",
  // alternate: false
  // },
  {
    id: 3,
    title: "Sticky Hidden Markov Model for Financial Regime Detection",
    description: "Implemented a custom Sticky Hidden Markov Model from scratch using log-space Expectation-Maximization and Viterbi decoding to identify market regimes in financial time series. Added sticky transition regularization to reduce regime chatter and validated with log-likelihood and persistence metrics. Strengthened skills in probabilistic modeling and algorithmic sequence analysis.",
    image: "/HMM-Regime-Results.png",
    alternate: false
  },
  {
    id: 4,
    title: "Impact of In-Context Learning on Small LLM Reasoning",
    description: "Independently designed and executed a study on how in-context learning (ICL) affects mathematical reasoning in small language models. Built evaluation pipelines comparing zero-shot and few-shot prompting across difficulty levels, revealing how example selection influences reasoning behavior. Communicated findings through a poster and written report, strengthening skills in experimental design, evaluation, and interpretation of LLM behavior.",
    image: "ICL-Results.png",
    alternate: true
  },
   {
    id: 5,
    title: "Procter & Gamble Customer Review Analysis",
    description: "Developed an NLP clustering pipeline using SBERT embeddings, UMAP, and HDBSCAN with custom cluster labeling to analyze 60,000+ customer reviews. Extracted actionable insights on sentiment and product feedback, demonstrating the ability to process large-scale text data, evaluate clustering quality, and translate latent patterns into business interpretable insights.",
    image: "/P&G.jpg",
    alternate: false
  },
  {
    id: 6,
    title: "Weather Predictor",
    description: "Built a multilayer perceptron (MLP) from scratch using NumPy, Pandas, and SciPy to forecast weather conditions from historical time-series data. Implemented forward/backward propagation manually, using GeLU activations, residual connections, and L2 regularization to improve generalization. Strengthened understanding of neural network fundamentals and time-series modeling.",
    image: "/Weather-Icons.png",
    alternate: true
  },
  {
    id: 7,
    title: "Movie Sentiment Analyzer",
    description: "Built an end-to-end text classification pipeline to predict sentiment in movie reviews using Scikit-learn and PyTorch. Engineered features with TF-IDF and word embeddings, and trained neural networks for >85% accuracy. Gained hands-on experience in NLP, model evaluation, and handling unstructured text data.",
    image: "/3-tips-sentiment-analysis.jpg",
    alternate: false
  }
  ];

  return (
    <div className="tab-panel active projects-page">
      <div className="Projects-List">
        {projectsData.map(project => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            alternate={project.alternate}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;