export const API_URL = 'http://localhost:3455'
export const getRequest = async(path) => {
    try {
      const response = await fetch(`${API_URL}/${path}`, {
        method: 'GET',
        credentials: 'include'
      })
      if(!response.ok){
        throw new Error("something went wrong")
      }
      return {
        data: await response.json(),
        error: null
      }
    } catch (error) {
        return {
            data: null,
            error: error.message
        }
    }
}
export const postRequest = async(path,body,method) => {
     const response = await fetch(`${API_URL}/${path}`, {
            method: method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )  // ← this should be "body", not "data"
        });
        if(!response.ok){
            throw new Error("unknown error")
        }
        return response
}


// const ram = {
//     name: "Sujal",
//     dob: ""
// }

// const jack = {
//    name: "Jack",
//    dateOfBirth: "" 
// }

// const user = new User("jack", 22)

// class User {
//     constructor(name, age){
//         this.name = name 
//         this.age = age 
//     }
// }
