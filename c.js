var count
document.querySelector('.btn0').addEventListener('click',function(){
    document.getElementById('bbb').innerHTML = Math.floor(Math.random()*2)

    if (document.getElementById('bbb').innerHTML == 0) {
    document.getElementById('aaa').innerHTML = 'win'
    document.querySelector('.win').innerHTML-=-1
    } else{document.getElementById('aaa').innerHTML = 'lose'
    document.querySelector('.lose').innerHTML-=-1
}
})

document.querySelector('.btn1').addEventListener('click',function(){
    document.getElementById('bbb').innerHTML = Math.floor(Math.random()*2)

    if (document.getElementById('bbb').innerHTML == 1) {
    document.getElementById('aaa').innerHTML = 'win'
    document.querySelector('.win').innerHTML-=-1
    } else{document.getElementById('aaa').innerHTML = 'lose'
    document.querySelector('.lose').innerHTML-=-1
}    
})


    var web3 = new Web3(web3.currentProvider);    
    var abi =[
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "bet",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "y",
                    "type": "uint256"
                }
            ],
            "name": "see",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "code",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "chain",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "xx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "show",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "issee",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_in",
                    "type": "address"
                }
            ],
            "name": "codelength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    var address ="0x842FAD747C8AC9526A62782842C26C8B1Ffa5Dd2"
    var Contract = new web3.eth.Contract(abi,address);

    async function connectWallet() {    
           
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }]						
        })
        await web3.eth.requestAccounts().then(() => {                        	
        });
        var accounts = await web3.eth.getAccounts()
        document.querySelector('.btn').value = await accounts[0]
        var balance = await web3.eth.getBalance(accounts[0])
        document.getElementById('ddd').innerHTML = web3.utils.fromWei(balance)
        clear()
        await Contract.methods.codelength(accounts[0]).call().then(function(data){
            for (let x = data; x >= 1; x-- ) { 
                Contract.methods.code(accounts[0],x-1).call().then(function(data2){                           
                BlockNumber = web3.eth.getBlockNumber()
                if (data2[0]+5 > BlockNumber) {
                document.getElementById('ccc').innerHTML = document.getElementById('ccc').innerHTML + '<div class="inin"><p>No.'+x+'</p><p>Guess: '+data2[1]+'</p><p>result: none</p><input type="button" value="wait"></div>'
                }else{
                    if (data2[3]) {
                    document.getElementById('ccc').innerHTML = document.getElementById('ccc').innerHTML + '<div class="inin"><p>No.'+x+'</p><p>Guess: '+data2[1]+'</p><p>result: '+data2[2]+'</p><input type="button" value="seen" disabled ></div>'
                    }else{
                    document.getElementById('ccc').innerHTML = document.getElementById('ccc').innerHTML + '<div class="inin"><p>No.'+x+'</p><p>Guess: '+data2[1]+'</p><p id="a'+x+'">result: none</p><input type="button" id="'+x+'" value="see" onclick="see()"></div>'
                    }                
                }
                })
            }   
            count = data - -1              
        })		  			
    }
   connectWallet()
   
async function bet0(){    
    var accounts =await web3.eth.getAccounts()
    web3.eth.net.getId().then(function(data){
    if (document.querySelector('.btn').value != accounts[0] | data != 97) {
        connectWallet()    
        }else{
        Contract.methods.bet("0").send({from:accounts[0],value:web3.utils.toWei('0.1')}).then(function(){
         document.getElementById('ccc').innerHTML ='<div class="inin"><p>No.'+count+'</p><p>Guess: 0</p><p>result: none</p><input type="button" value="wait"></div>' + document.getElementById('ccc').innerHTML    
        count+=1        
        })
    }})
}

document.querySelector('.btn00').addEventListener('click',function(){
    bet0()
})

async function bet1(){
    var accounts =await web3.eth.getAccounts()
    web3.eth.net.getId().then(function(data){
    if (document.querySelector('.btn').value != accounts[0] | data!=97) {
        connectWallet()    
        }else{
        Contract.methods.bet("1").send({from:accounts[0],value:web3.utils.toWei('0.1')}).then(function(){
         document.getElementById('ccc').innerHTML ='<div class="inin"><p>No.'+count+'</p><p>Guess: 0</p><p>result: none</p><input type="button" value="wait"></div>' + document.getElementById('ccc').innerHTML    
        count+=1        
        })
    }})
}

document.querySelector('.btn11').addEventListener('click',function(){
    bet1()   
}) 

document.querySelector('.btn').addEventListener('click',function(){
    connectWallet()  
})

function clear(){
    document.getElementById('ccc').innerHTML = ""
}


async function see(){
    c=event.target.id
    var accounts = await web3.eth.getAccounts()
    web3.eth.net.getId().then(function(data){
    if (document.querySelector('.btn').value != accounts[0] | data!=97) {
        connectWallet()    
        }else{
        Contract.methods.see(c).send({from:accounts[0]}).then(function(){
            Contract.methods.code(accounts[0],c-1).call().then(function(data){
            document.getElementById('a'+c).innerHTML= 'result: '+ data[2]
            })
            document.getElementById(c).value = 'seen'
            document.getElementById(c).disabled = 'ture'
        })
    }})
}
$( document ).ready(function() {
    console.log( "ready!" );

    console.log("window.ethereum===",window.ethereum)
     //判断是否支持浏览器钱包
     if (!window.ethereum) {
        alert("没有浏览器钱包，请先下载浏览器钱包");
        return false;
    }
    
    // 获取服务提供器，若没有，则可设置成自己的服务提供器
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://192.168.237.110:8545"));
    }

    /* 节点信息 - 提前加载 */
    web3.eth.getNodeInfo(function(error, result){
        if(error){
            console.log( "error" ,error);
        }
        else{
            $('#NodeInfo').val(result);
        }
    });
    /* 事件 - 查询账户余额 */
			$('#checkBalance').click(function() {
			    var _account = $('#Account').val();
				if (_account == "") {
					alert("请输入账户地址");
					return;
				}
				web3.eth.getBalance(_account).then(function(result){
					$('#Balance').val(web3.utils.fromWei(result, 'ether'));
				});
			});
			
			
			/* 事件 - 转账 */
			$('#Transfer').click(function() {
				$('#Tx').text('');
				var _from = $('#From').val();
			    var _to = $('#To').val();
				var _Amount = $('#Amount').val();
				
				if (_from == "") {
					alert("请入输入账户地址");
					return;
				}
				
				if (_to == "") {
					alert("请入输出账户地址");
					return;
				}
				
				if (_Amount == "") {
					alert("请入输入转账金额");
					return;
				}
				var txnObject = {
					"from":_from,
					"to": _to,
					"value": web3.utils.toWei(_Amount,'ether'),
					"gas": 3000000,        // (可选)
					// "gasPrice": 4500000,  (可选)
					// "data": 'For testing' (可选)
					// "nonce": 10           (可选)
				}
			
				web3.eth.sendTransaction(txnObject, function(error, result){
					if(error){
						alert("转账失败，错误信息：" + error.message);
					}
					else{
						//显示生成的交易hash
						var txn_hash = result; 
						$('#Tx').text(txn_hash);
					}
				});
				
			});

			
			/* 合约 */
			// 合约地址
			var address = $("#address").val();
			// 合约ABI
			var abi = $("#abi").val();
			abi = JSON.parse(abi);

			// 创建合约对象
			var myContract = new web3.eth.Contract(abi, address);

			// 显示消息
			function getMsg() {			
				myContract.methods.getMsg().call().then(function(msg){
						$("#getMsg").val(msg);
					});
			}

			// 显示消息 - 提前显示
			getMsg();

			/* 事件 - 查询消息 */
			$("#GetMsg").click(function() {
				getMsg();
			});

			/* 事件 - 设置消息 */
			$("#SetMsg").click(function() {

				var newMsg = $("#setMsg").val();
				if (newMsg == "") {
					alert("请输入要设置的消息");
					return;
				}

				const sendFunc = async () => {
					try {
						const accounts = await web3.eth.getAccounts();

						//调用合约函数
						myContract.methods.setMsg(newMsg).send({
							from: accounts[0],
							gas: 3000000
						}).on("transactionHash", function(hash){
							// 显示交易Hash
							$('#TxContract').text(hash);
						}).on("receipt", function(receipt) {
							console.log("receipt==", receipt);
							if (receipt.status) {
								alert("设置成功");
							} else {
								alert("设置失败");
							}
						}).on("error", function(error) {
							alert("交易发生错误：" + error);
						});

						return accounts;

					} catch (err) {
						console.log(err);
					}
				}

				sendFunc();
			});

		
		});