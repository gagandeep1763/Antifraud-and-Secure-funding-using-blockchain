import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './styles/campaigns.css';
import campaign1 from './images/campaign1.png';
import campaign2 from './images/campaign2.png';
import campaign3 from './images/campaign3.png';
import campaign4 from './images/campaign4.png';
import campaign5 from './images/campaign5.png';
import campaign6 from './images/campaign6.png';
import campaign7 from './images/campaign7.png';
import campaignBg from './styles/pbg.gif';

const Campaigns = () => {
  const [account, setAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    web3 = new Web3('http://127.0.0.1:7545');
  }

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
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        await web3.eth.sendTransaction({
          from: selectedAccount,
          to: selectedAccount,
          value: web3.utils.toWei(amount.toString(), 'ether'),
        });
        alert("Transaction sent successfully!");
        await refreshCampaigns();
      } else {
        alert("MetaMask is not installed.");
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Check console for details.');
    }
  };

  const mockCampaigns = [
    {
      id: 0,
      name: 'Water for All',
      description: 'Clean water access for rural communities.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
    },
    {
      id: 1,
      name: 'Education Support',
      description: 'Help underprivileged children with education.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
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
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 12,
    },
    {
      id: 4,
      name: 'Orphanage',
      description: 'Offering a safe and nurturing environment for children.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
    },
    {
      id: 5,
      name: 'Healthcare',
      description: 'Providing medical attention and care quality of people.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 12,
    },
    {
      id: 6,
      name: 'Art and Culture',
      description: 'Promoting creativity, diversity and cultural heritage.',
      deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
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
        console.error('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error requesting accounts:', error);
    }
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <div
      className="campaign-page"
      style={{
        backgroundImage: `url(${campaignBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <div id="account" className="text-center mb-4">
        {account ? `Connected: ${account}` : 'Please connect your wallet'}
      </div>
      <div id="campaigns" className="d-flex flex-wrap justify-content-center">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="card shadow-sm m-2 glowing-card"
              style={{ width: '15rem' }}
            >
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

export default Campaigns;
