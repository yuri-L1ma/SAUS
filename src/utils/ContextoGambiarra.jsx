// import React, { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const ContextoGambiarra = createContext();

// function ContextoGambiarraProvider({ children }) {
//   const [user, setUser] = useState(null);
//   // const [nome, setNome] = useState(null);
//   // const [email, setEmail] = useState(null);
//   // const [senha, setSenha] = useState(null);
//   // const [matricula, setMatricula] = useState(null);
//   // const [curso, setCurso] = useState(null);
//   // const [semestre, setSemestre] = useState(null);
//   const [admin, setAdmin] = useState(false);

//   useEffect(() => {
//     const validarId = () => {
//       const storageData = localStorage.getItem("id");
//       if (storageData) {
//         const isAdmin = localStorage.getItem("admin") === "true";
//         setAdmin(isAdmin);

//         const endpoint = isAdmin ? `admin/retrieve/${storageData}` : `alunos/retrieve/${storageData}`;
//         axios.get(`http://localhost:3002/${endpoint}`)
//           .then((response) => {
//             setUser(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     };

//     validarId();
//   }, []);

//   const setId = (id) => {
//     localStorage.setItem("id", id);
//   };

//   // const setNome = (nome) => {
//   //   localStorage.setItem("nome", nome);
//   // }

//   // const setEmail = (email) => {
//   //   localStorage.setItem("email", email);
//   // }

//   // const setSenha = (senha) => {
//   //   localStorage.setItem("senha", senha);
//   // }

//   // const setMatricula = (matricula) => {
//   //   localStorage.setItem("matricula", matricula);
//   // }

//   // const setCurso = (curso) => {
//   //   localStorage.setItem("curso", curso);
//   // }

//   // const setSemestre = (semestre) => {
//   //   localStorage.setItem("semestre", semestre);
//   // }

//   const setAdminStatus = (isAdmin) => {
//     localStorage.setItem("admin", isAdmin);
//     setAdmin(isAdmin);
//   };

//   const clearStorage = () => {
//     // localStorage.removeItem("id");
//     // localStorage.removeItem("admin");
//     // localStorage.removeItem("nome");
//     // localStorage.removeItem("email");
//     // localStorage.removeItem("senha");
//     // localStorage.removeItem("matricula");
//     // localStorage.removeItem("curso");
//     // localStorage.removeItem("semestre");
//     setUser(null);
//     setAdmin(false);
//   };

//   const loginAluno = (email, senha) => {
//     const dados =  axios.post("http://localhost:3002/login", { email, senha })
//       .then((response) => {
//         // setNome(response.data.nome);
//         // setEmail(response.data.email);
//         // setSenha(response.data.senha);
//         // setMatricula(response.data.matricula);
//         // setCurso(response.data.curso);
//         // setSemestre(response.data.semestre);
//         setId(response.data.id);
//         setAdminStatus(false);
//         setUser(response.data);

//         return response.data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     if (dados) {
//       return true;
//     }

//     return false;

//   };

//   const loginAdmin = (email, senha) => {
//     const dados = axios.post("http://localhost:3002/admin/login", { email, senha })
//       .then((response) => {
//         setUser(response.data);
//         setId(response.data.id);
//         setAdminStatus(true);
//         return true;
//       })
//       .catch((error) => {
//         console.log(error);
//         return false;
//       });

//     if (dados) {
//       return true;
//     }

//     return false;

//   };

//   const logout = () => {
//     setUser(null);
//     clearStorage();
//   };

//   return (
//     <ContextoGambiarra.Provider value={{ user, admin, loginAluno, loginAdmin, logout }}>
//       {children}
//     </ContextoGambiarra.Provider>
//   );
// }

// export { ContextoGambiarra, ContextoGambiarraProvider };


import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ContextoGambiarra = createContext();

function ContextoGambiarraProvider({ children }) {
  const [user, setUser] = useState({})
  const [admin, setAdmin] = useState(false)
  const storageData = localStorage.getItem("id")
  const [endpoint, setEndpoint] = useState(localStorage.getItem("admin") === "true" ? `admin/retrieve/${storageData}` : `alunos/retrieve/${storageData}`)

  const validarId = async () => {
    
    setAdmin(localStorage.getItem("admin") === "true")

    try {
      const userLogado = await axios.get(`http://localhost:3002/${endpoint}`)
      console.log(userLogado.data)
      setUser(userLogado.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("ADM MUDOU")
    const aux = localStorage.getItem("admin") === "true"
    console.log(aux)
    if(aux){
      console.log("ENTROU")
      setEndpoint(`admin/retrieve/${storageData}`)
    }else{
      console.log("SAIU")
      setEndpoint(`alunos/retrieve/${storageData}`)
    }
    // setEndpoint(localStorage.getItem("admin") ? `admin/retrieve/${storageData}` : `alunos/retrieve/${storageData}`);
  }, [admin])

  useEffect(() => {
    validarId()
  }, [])

  const setId = (id) => {
    localStorage.setItem("id", id)
  }

  const setIsAdmin = (bool) => {
    localStorage.setItem("admin", bool)
    setAdmin(bool)
    /*
    localStorage.setItem("admin", bool);
    setAdmin(bool);
    */
  }

  const clearStorage = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("admin")
    setAdmin(false)

  }


  const loginAluno = async (email, senha) => {
    let response = null

    response = await axios.post("http://localhost:3002/login", { email, senha })

    console.log(response.data)
    console.log(response.data.id)

    setUser(response.data)
    setId(response.data.id)
    setIsAdmin(false)

    if (response) {
      return response
    } else {
      return false
    }

  }


  const loginAdmin = async (email, senha) => {
    let response = null

    response = await axios.post("http://localhost:3002/admin/login", { email, senha })

    // console.log(response.data)
    // console.log(response.data.id)

    setUser(response.data)
    setId(response.data.id)
    setIsAdmin(response.data.admin)

    if (response) {
      return response
    } else {
      return false
    }

  }

  const logout = () => {
    setUser({})
    clearStorage()
  }

  return (
    <ContextoGambiarra.Provider value={{ user, admin, loginAluno, loginAdmin, logout }}>
      {children}
    </ContextoGambiarra.Provider>
  );
}

export { ContextoGambiarra, ContextoGambiarraProvider };