export const authUser = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user){
        return {"x-authuser-token" : user}
    }
    else{
        return null;
    }
}