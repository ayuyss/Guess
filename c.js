// var count
// document.querySelector('.btn0').addEventListener('click',function(){
//     document.getElementById('bbb').innerHTML = Math.floor(Math.random()*2)

//     if (document.getElementById('bbb').innerHTML == 0) {
//     document.getElementById('aaa').innerHTML = 'win'
//     document.querySelector('.win').innerHTML-=-1
//     } else{document.getElementById('aaa').innerHTML = 'lose'
//     document.querySelector('.lose').innerHTML-=-1
// }
// })

// document.querySelector('.btn1').addEventListener('click',function(){
//     document.getElementById('bbb').innerHTML = Math.floor(Math.random()*2)

//     if (document.getElementById('bbb').innerHTML == 1) {
//     document.getElementById('aaa').innerHTML = 'win'
//     document.querySelector('.win').innerHTML-=-1
//     } else{document.getElementById('aaa').innerHTML = 'lose'
//     document.querySelector('.lose').innerHTML-=-1
// }    
// })


//     var web3 = new Web3(window.web3.currentProvider);    
//     var abi =[
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "x",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "bet",
//             "outputs": [],
//             "stateMutability": "payable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "y",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "see",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "code",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "chain",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "xx",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "show",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "bool",
//                     "name": "issee",
//                     "type": "bool"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "_in",
//                     "type": "address"
//                 }
//             ],
//             "name": "codelength",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "owner",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         }
//     ]
//     var address ="0x842FAD747C8AC9526A62782842C26C8B1Ffa5Dd2"
//     var Contract = new web3.eth.Contract(abi,address);

//     async function connectWallet() {    
//         web3.eth.net.getId().then(function(data){if (data!=97){alert('not BSC test')}}) 
//         await window.ethereum.request({
//             method: 'wallet_switchEthereumChain',
//             params: [{ chainId: '0x61' }]						
//         })
        
//         await web3.eth.requestAccounts().then(() => {                        	
//         });
//         var accounts = await web3.eth.getAccounts()
//         document.querySelector('.btn').value = await accounts[0]
//         var balance = await web3.eth.getBalance(accounts[0])
//         document.getElementById('ddd').innerHTML = web3.utils.fromWei(balance)
//         clear()
//         await Contract.methods.codelength(accounts[0]).call().then(function(data){
//             for (let x = data; x >= 1; x-- ) { 
//                 Contract.methods.code(accounts[0],x-1).call().then(function(data2){                           
//                 BlockNumber = web3.eth.getBlockNumber()
//                 if (data2[0]+5 > BlockNumber) {
//                 document.getElementById('ccc').innerHTML = document.getElementById('ccc').innerHTML + '<div class="inin"><p>No.'+x+'</p><p>Guess: '+data2[1]+'</p><p>result: none</p><input type="button" value="wait 15s"></div>'
//                 }else{
//                     if (data2[3]) {
//                     document.getElementById('ccc').innerHTML = document.getElementById('ccc').innerHTML + '<div class="inin"><p>No.'+x+'</p><p>Guess: '+data2[1]+'</p><p>result: '+data2[2]+'</p><input type="button" value="seen" disabled ></div>'
//                     }else{
//                     document.getElementById('ccc').innerHTML = document.getElementById('ccc').innerHTML + '<div class="inin"><p>No.'+x+'</p><p>Guess: '+data2[1]+'</p><p id="a'+x+'">result: none</p><input type="button" id="'+x+'" value="see" onclick="see()"></div>'
//                     }                
//                 }
//                 })
//             }   
//             count = data - -1              
//         })		  			
//     }
//    connectWallet()
   
// async function bet0(){    
//     var accounts =await web3.eth.getAccounts()
//     web3.eth.net.getId().then(function(data){
//     if (document.querySelector('.btn').value != accounts[0] | data != 97) {
//         connectWallet()    
//         }else{
//         Contract.methods.bet("0").send({from:accounts[0],value:web3.utils.toWei('0.1')}).then(function(){
//          document.getElementById('ccc').innerHTML ='<div class="inin"><p>No.'+count+'</p><p>Guess: 0</p><p>result: none</p><input type="button" value="wait"></div>' + document.getElementById('ccc').innerHTML    
//         count+=1        
//         })
//     }})
// }

// document.querySelector('.btn00').addEventListener('click',function(){
//     bet0()
// })

// async function bet1(){
//     var accounts =await web3.eth.getAccounts()
//     web3.eth.net.getId().then(function(data){
//     if (document.querySelector('.btn').value != accounts[0] | data!=97) {
//         connectWallet()    
//         }else{
//         Contract.methods.bet("1").send({from:accounts[0],value:web3.utils.toWei('0.1')}).then(function(){
//          document.getElementById('ccc').innerHTML ='<div class="inin"><p>No.'+count+'</p><p>Guess: 0</p><p>result: none</p><input type="button" value="wait"></div>' + document.getElementById('ccc').innerHTML    
//         count+=1        
//         })
//     }})
// }

// document.querySelector('.btn11').addEventListener('click',function(){
//     bet1()   
// }) 

// document.querySelector('.btn').addEventListener('click',function(){
//     connectWallet()  
// })

// function clear(){
//     document.getElementById('ccc').innerHTML = ""
// }


// async function see(){
//     c=event.target.id
//     var accounts = await web3.eth.getAccounts()
//     web3.eth.net.getId().then(function(data){
//     if (document.querySelector('.btn').value != accounts[0] | data!=97) {
//         connectWallet()    
//         }else{
//         Contract.methods.see(c).send({from:accounts[0]}).then(function(){
//             Contract.methods.code(accounts[0],c-1).call().then(function(data){
//             document.getElementById('a'+c).innerHTML= 'result: '+ data[2]
//             })
//             document.getElementById(c).value = 'seen'
//             document.getElementById(c).disabled = 'ture'
//         })
//     }})
// }

document.getElementById('fff').addEventListener('click',function(){
    document.getElementById('ggg').src=document.getElementById('eee').value
})