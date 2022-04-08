import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2, FiSearch } from "react-icons/fi";
import api from "../services/api";
import pic from "../asset/icons8-user-50.png";

const Home = () => {
  const history = useNavigate("");
  const [contactos, setContactos] = useState([]);
  const [search, setSearch] = useState([]);

  const pesquisa = (e) => {
    e.preventDefault();
    api
      .post(`/contacto/search`, { search: search })
      .then((res) => {
        setContactos(res.data.data);

        console.log(res);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const submit = (id) => {
    confirmAlert({
      title: "",
      message: "Tem a certeza que quer apagar este contacto?",
      buttons: [
        {
          label: "Apagar",
          onClick: () => {
            api
              .delete(`/contacto/delete/${id}`)
              .then((res) => {
                load();
              })
              .catch((erro) => {
                console.log(erro);
              });
          },
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  useEffect(() => {
    load();
  }, []);

  function load() {
    api
      .get("/contacto")
      .then((res) => {
        setContactos(res.data.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <Fragment>
      <div className="cardHome">
        <div className="cardHeader">
          <h1 style={{ fontSize: "30px" }}>Contactos</h1>

          <button className="add" onClick={() => history("/create")}>
            <span>+</span>
          </button>
        </div>

        <form onSubmit={pesquisa}>
          <div className="search">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Pesquisar"
            />
            <button type="submit">
              <FiSearch size={20} />
            </button>
          </div>
        </form>

        <div className="box">
          {contactos.length != 0 ? (
            contactos.map((contacto) => {
              return (
                <div className="contactos" key={contacto.nome}>
                  <div className="user">
                    <div className="pic">
                      <img
                        width={"100%"}
                        height={"100%"}
                        style={{ borderRadius: "5px" }}
                        src={contacto.ficheiro === 1 ? pic : contacto.ficheiro}
                      />
                    </div>
                    <div className="detail">
                      <p>{contacto.nome}</p>
                      <p>{contacto.contacto}</p>
                    </div>
                    <div className="action">
                      <Link to={`/update/${contacto.id}`}>
                        <button>
                          <FiEdit2 size={22} color="#3C0066" />
                        </button>
                      </Link>
                      <button onClick={() => submit(contacto.id)}>
                        <AiFillDelete size={22} color="#3C0066" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty">Nenhum contacto adicionado a lista</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
