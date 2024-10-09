import { CartItem } from "@/types";
import * as React from "react";

interface EmailTemplateProps {
  items: CartItem[];
  dealerInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  items,
  dealerInfo,
}) => (
  <html>
    <body style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.header}>Hola, {dealerInfo.name}!</h1>
        <p style={styles.text}>
          Te hemos enviado un pedido con los siguientes detalles:
        </p>
        <p style={styles.text}>Datos del cliente:</p>
        <ul style={styles.ul}>
          <li>Nombre: {dealerInfo.name}</li>
          <li>Teléfono: {dealerInfo.phone}</li>
          <li>Email: {dealerInfo.email}</li>
        </ul>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={styles.th}>SKU</th>
              <th style={styles.th}>Descripción</th>
              <th style={styles.th}>Cantidad</th>
              <th style={styles.th}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sku}>
                <td style={styles.td}>{item.sku}</td>
                <td style={styles.td}>{item.description}</td>
                <td style={styles.td}>{item.qty}</td>
                <td style={styles.td}>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </body>
  </html>
);

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f6f6f6",
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  header: {
    color: "#333333",
  },
  text: {
    fontSize: "16px",
    color: "#555555",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#fafafa",
    padding: "10px",
    border: "1px solid #dddddd",
  },
  td: {
    padding: "10px",
    border: "1px solid #dddddd",
  },
  ul: {
    listStyleType: "none",
    padding: 0,
  },
};
