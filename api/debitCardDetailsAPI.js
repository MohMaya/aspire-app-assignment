import axios from "axios";

export default axios.create({
    baseURL: "https://apimocha.com/aspire-app-tha",
    // headers:{
// No need for a header since no auth is needed
    // }
});