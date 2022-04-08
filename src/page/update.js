import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Label, Button, Media } from "reactstrap";
import api from "../services/api";
import pic from "../asset/icons8-user-50.png";
import { BsCloudUploadFill } from "react-icons/bs";

const Update = () => {
  const id = useParams();
  const history = useNavigate();
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [anexo, setAnexo] = useState(pic);

  useEffect(() => {
    api
      .get(`/contacto/update/${id.id}`)
      .then((res) => {
        console.log(res);
        const data = res.data.data;
        setNome(data.nome);
        setNumero(data.contacto);
        setAnexo(data.ficheiro);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  function update() {
    const image = document.getElementById("image");

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("contacto", numero);
    formData.append("ficheiro", image.files[0]);

    api
      .put(`/contacto/update/${id.id}`, formData)
      .then((res) => {
        history("/");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  const onFileChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      files[0].type.slice(0, 5) === "image"
        ? setAnexo(reader.result)
        : setAnexo("");
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <Fragment>
      <div className="cardHome">
        <div className="cardHeader">
          <button onClick={() => history(-1)} className="back">
            <span>X</span>
          </button>

          <h1 className="contactLabel">Editar contacto</h1>

          <button onClick={update} className="saveButton">
            <span>Guardar</span>
          </button>
        </div>

        <form>
          <div className="imagem">
            <Media className="" left>
              <Media src={anexo} object className="rounded mr-50" alt="" />
            </Media>

            <Button
              tag={Label}
              className="mr-75 mt-2"
              size="sm"
              color="transparent"
            >
              <Input
                type="file"
                id="image"
                hidden
                onChange={onFileChange}
                accept="image/.pdf"
                name="imagem"
              />
              <Label style={{ fontSize: "20px" }} for="image">
                <BsCloudUploadFill size={30} />
              </Label>
            </Button>
          </div>

          <div className="form">
            <div className="name">
              <h1>Nome</h1>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Introduz o nome completo"
                type="text"
              />
            </div>
          </div>

          <div className="form">
            <div className="number">
              <h1>Número de celular</h1>
              <input
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Introduz o número"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Update;
