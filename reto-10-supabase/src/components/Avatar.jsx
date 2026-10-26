
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Avatar({ sesion }) {
  const [imagen, setImagen] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [ruta, setRuta] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const userId = sesion.user.id;

  useEffect(() => {
    let activo = true;

    async function cargarAvatar() {
      const { data, error } = await supabase.storage
        .from("avatars")
        .list(userId, {
          limit: 100,
          sortBy: { column: "name", order: "desc" }
        });

      if (!activo) return;

      if (error) {
        setMensaje(error.message);
        return;
      }

      const foto = data?.find((f) =>
        f.name.startsWith("avatar-")
      );

      if (foto) {
        const nombre = `${userId}/${foto.name}`;

        const { data: url } = supabase.storage
          .from("avatars")
          .getPublicUrl(nombre);

        setImagen(url.publicUrl);
        setRuta(nombre);
      }
    }

    cargarAvatar();

    return () => {
      activo = false;
    };
  }, [userId]);

  async function subirAvatar(e) {
    e.preventDefault();

    if (!archivo || subiendo) return;

    const tipos = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/webp": "webp"
    };

    if (!tipos[archivo.type]) {
      setMensaje("Selecciona una imagen PNG, JPG o WEBP");
      return;
    }

    if (archivo.size > 2 * 1024 * 1024) {
      setMensaje("La imagen no puede superar los 2 MB");
      return;
    }

    setSubiendo(true);
    setMensaje("");

    const nombre = `${userId}/avatar-${Date.now()}.${tipos[archivo.type]}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(nombre, archivo, {
        contentType: archivo.type
      });

    if (error) {
      setMensaje(error.message);
    } else {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(nombre);

      setImagen(data.publicUrl);
      setArchivo(null);
      setMensaje("Foto guardada correctamente");

      if (ruta) {
        await supabase.storage
          .from("avatars")
          .remove([ruta]);
      }

      setRuta(nombre);
    }

    setSubiendo(false);
  }

  return (
    <section style={{ marginTop: "20px" }}>
      <h2>Foto de perfil</h2>

      {imagen ? (
        <img
          src={imagen}
          alt="Foto de perfil"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      ) : (
        <p>Todavía no tienes foto de perfil</p>
      )}

      <form onSubmit={subirAvatar}>
        <input
          key={ruta}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) =>
            setArchivo(e.target.files[0] || null)
          }
        />

        <button
          type="submit"
          disabled={!archivo || subiendo}
        >
          {subiendo ? "Subiendo..." : "Guardar foto"}
        </button>
      </form>

      <p role="status">{mensaje}</p>
    </section>
  );
}
