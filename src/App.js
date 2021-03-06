import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function App() {
  return (
    <div className="regist">
      <h3>登陆测试</h3>
        <TextField
            id="standard-basic"
            label="用户名"
            color="secondary"
        />
        <br/>
        <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
        />
        <br/>
        <Button variant="contained" color="primary" onClick={landing}>
            登陆
        </Button>

        <Button variant="contained" color="primary" onClick={clickVip}>
            vip接口测试
        </Button>


    </div>
  );
}

/**
 *登陆接口测试
 */
function landing(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"username":"vip1","password":"321"});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8001/api/token", requestOptions)
        .then(function (response) {
            response.json()
            let authorizationToken = response.headers.get("Authorization");
            let refreshToken = response.headers.get("Authorization");
            localStorage.setItem("Authorization",authorizationToken)
            localStorage.setItem("RefreshToken",refreshToken)
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


}




function clickVip(){

    if (localStorage.getItem("Authorization")!=null){
        let authorization = localStorage.getItem("Authorization")

        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization", authorization
        );
        // myHeaders.append(
        //     "RefreshToken", "Bearer eyJUWVAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aXAxIiwiaXNzIjoid3d3LmNqbGx5LmNvbSIsInJvbHVlIjpbIlJPTEVfdmlwMSJdLCJleHAiOjE2MTQ2ODk2MDksImlhdCI6MTYxNDY4OTQyOX0.7NB5866_jIvWZCMMVfnCywsQs6Bw8BCw0o9CL7ZAGRdZexNBcjOqnOJXuouOgE4t3omXB7aGtvCj-PEu2SSXSQ"
        // );

        console.log("测试"+fetch_vip(myHeaders))

    }


    function fetch_vip(headers){
        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
            mode: 'cors'
        };
        fetch("http://127.0.0.1:8001/vip", requestOptions)
            // .then(response => console.log(response.headers.get("Authorization")))
            .then(response => response.json())
            .then(function (result){
                console.log(result)
                if (result.code === 403){

                }
            })
            .catch(error => console.log('error', error));
    }

}

export default App;
