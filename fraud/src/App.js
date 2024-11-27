import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';
import CrowdfundingABI from './contracts/Crowdfunding.json'; 
import './index.css';

import campaign1 from './images/campaign1.jpg';
import campaign2 from './images/campaign2.jpg';
import campaign3 from './images/campaign3.jpg';
import campaign4 from './images/campaign4.jpg';
import campaign5 from './images/campaign5.jpg';
import campaign6 from './images/campaign6.jpg';
import campaign7 from './images/campaign7.jpg';

import companyImage3 from './images/companyImage3.jpg';

const Campaigns = () => {
  const [account, setAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    web3 = new Web3('http://127.0.0.1:7545'); 
  }

  const contract = new web3.eth.Contract(CrowdfundingABI.abi, CrowdfundingABI.networks['5777'].address);

  const campaignImages = {
    0: campaign1, 
    1: campaign2,
    2: campaign3,
    3: campaign4, 
    4: campaign5,
    5: campaign6,
    6: campaign7, 

  };

  const contributeToCampaign = async (campaignId, amount) => {
    try {
      await contract.methods.contribute(campaignId).send({
        from: account,
        value: web3.utils.toWei(amount.toString(), 'ether'),
      });
      await refreshCampaigns(); 
    } catch (error) {
      console.error('Error contributing to campaign:', error);
    }
  };

  const mockCampaigns = [
    {
      id: 0,
      name: 'Water for All',
      description: 'Clean water access for rural communities.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5, 
    },
    {
      id: 1,
      name: 'Education Support',
      description: 'Help underprivileged children with education.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, 
    },
    {
      id: 2,
      name: 'Tree Planting',
      description: 'Contribute to combat climate change.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10, 
    },
    {
      id: 3,
      name: 'Animal Welfare',
      description: 'Providing shelter, care, and advocacy for animals.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5, 
    },
    {
      id: 4,
      name: 'Orphanage',
      description: 'Offering a safe and nurturing environment for children.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, 
    },
    {
      id: 5,
      name: 'Healthcare',
      description: 'Providing medical attention and care quality of people.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10, 
    },
    {
      id: 6,
      name: 'Art and Culture',
      description: 'Promoting creativity, diversity and cultural heritage.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5, 
    },
  ];

  const refreshCampaigns = async () => {
    const updatedCampaigns = mockCampaigns.map((campaign) => {
      const remainingTime = new Date(campaign.deadline * 1000).toLocaleString();
      return { ...campaign, remainingTime };
    });
    setCampaigns(updatedCampaigns);
  };

  const main = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        await refreshCampaigns();
      } else {
        console.error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error('Error requesting accounts:', error);
    }
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <div className="container my-5">
      <div id="account" className="text-center mb-4">
        {account ? `Connected: ${account}` : "Please connect your wallet"}
      </div>
      <div id="campaigns" className="d-flex flex-wrap justify-content-center">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="card shadow-sm m-2" style={{ width: '15rem' }}>
              <img 
                src={campaignImages[campaign.id]} 
                alt="Campaign" 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">{campaign.name}</h5>
                <p className="card-text">{campaign.description}</p>
                <p className="card-text text-muted">Ends: {campaign.remainingTime}</p>

                <button
                  className="btn btn-primary w-100 mt-2"
                  onClick={() => {
                    const amount = prompt('Enter amount in ETH:');
                    if (amount) {
                      contributeToCampaign(campaign.id, amount);
                    }
                  }}
                >
                  Contribute
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No active campaigns available.</p>
        )}
      </div>
    </div>
  );
};

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    alert('Feedback submitted successfully!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div id="feedback-container" className="container my-5">
      <form id="feedback-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2>Feedback</h2>
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            id="name" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea 
            id="message" 
            className="form-control" 
            rows="5" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};


const Home = () => (
  <div className="container my-5">
    <h1>Welcome to Finvest</h1>
    <img 
      src={companyImage3} 
      alt="Finvest" 
      className="img-fluid" 
      style={{ marginTop: '20px', borderRadius: '10px',width:'400px',height:'200px'}} 
    />
    <div style={{ marginTop: '40px' }}>
      <p>
        Finvest is a blockchain-based crowdfunding platform that empowers individuals and organizations 
        to bring their ideas to life. Our platform ensures transparency, security, and accountability 
        for all campaigns. Join us in building a better future!
      </p>
    </div>
    <div style={{ marginTop: '40px' }}> 
      <Link 
        to="/campaigns" 
        id="explore-btn" 
        style={{ marginTop: '30px' }}  
      >
        Explore Campaigns
      </Link>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/campaigns">Campaigns</Link>
          <Link to="/feedback">Feedback</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
