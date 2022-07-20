var USER_PUB_KEY = null;
var AMOUNT = 100;
var CONTRACT = null;
// const web3 = new Web3(Web3.givenProvider);

window.addEventListener("DOMContentLoaded", function () {
  console.log("load");
  console.log({ web3 });
  console.log({ provider: Web3.givenProvider });

  if (document.querySelector("#getAccount")) {
    const btnEl = document.querySelector("#getAccount");
    btnEl.addEventListener("click", (e) => {
      console.log("button clicked");
      initMetamask();
      // web3.eth.getAccounts().then(console.log);
    });
  }
  if (document.querySelector("#getCurrentAccount")) {
    const btnEl = document.querySelector("#getCurrentAccount");
    btnEl.addEventListener("click", (e) => {
      console.log("button clicked");
      requestCurrentAccount();
      // web3.eth.getAccounts().then(console.log);
    });
  }
  if (document.querySelector("#getCurrentAccountBalance")) {
    const btnEl = document.querySelector("#getCurrentAccountBalance");
    btnEl.addEventListener("click", (e) => {
      console.log("getCurrentAccountBalance button clicked");
      getCurrentAccountBalance();
      // web3.eth.getAccounts().then(console.log);
    });
  }
  if (document.querySelector("#sendTUSDT")) {
    const btnEl = document.querySelector("#sendTUSDT");
    btnEl.addEventListener("click", (e) => {
      console.log("sendTUSDT button clicked");
      sendTransactionToFlolio();
      // web3.eth.getAccounts().then(console.log);
    });
  }
});

const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
};

async function initMetamask() {
  const enabled = await ethEnabled();
  setUpContract();
  console.log(enabled);
}

function setContract(tokenContract) {
  CONTRACT = tokenContract;
}

async function setUpContract() {
  let tokenContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  setContract(tokenContract);
}

async function requestCurrentAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(accounts);
  const account = accounts[0];
  setPubKey(account);
  console.log(account);
}

function setPubKey(key) {
  USER_PUB_KEY = key;
}
function getPubkey() {
  return USER_PUB_KEY;
}
async function getCurrentAccountBalance() {
  console.log(web3);
  const userAddress = getPubkey();
  if (userAddress) {
    web3.eth.getBalance(userAddress).then((amount) => {
      console.log({ amount });
    });
    let WalletTokenBalance = await CONTRACT.methods
      .balanceOf(userAddress)
      .call();
    console.log({ WalletTokenBalance });
  } else console.log("account is not linked");
}

async function sendTransactionToFlolio() {
  const userAddress = getPubkey();
  //   const txObj = {
  //     to: "0x8000D1DC939C852edcC68deb5A784d0D52bb01D7",
  //     from: userAddress,
  //     value: amountInWEI,
  //     data: CONTRACT_ABI,
  //   };
  //   web3.eth.sendTransaction(txObj, (data) => console.log);
  try {
    // ethereum
    //   .request({
    //     method: "eth_sendTransaction",
    //     params: [
    //       {
    //         chainId: 4,
    //         from: userAddress,
    //         to: "0x8000D1DC939C852edcC68deb5A784d0D52bb01D7",
    //         value: AMOUNT.toString(),
    //         // data: CONTRACT_ADDRESS,
    //       },
    //     ],
    //   })
    //   .then((txHash) => console.log(txHash));
    let WalletTokenBalance = await CONTRACT.methods
      .transferFrom(
        userAddress,
        "0x8000D1DC939C852edcC68deb5A784d0D52bb01D7",
        "10000"
      )
      .send({ from: userAddress });
    console.log(WalletTokenBalance);
  } catch (error) {
    console.error;
  }
}
