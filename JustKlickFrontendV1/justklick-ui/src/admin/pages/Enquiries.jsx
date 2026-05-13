import { useEffect, useState } from "react";
import api from "../../api/api";

function Enquiries() {

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {

    try {

      const res = await api.get("/enquiries/all/");

      setEnquiries(res.data);

    } catch (error) {

      console.log("Error fetching enquiries:", error);

    } finally {

      setLoading(false);
    }
  };

  const sendReply = async (id) => {

    try {

      if (!replyText[id]?.trim()) {
        alert("Please enter reply message");
        return;
      }

      await api.patch(
        `/enquiries/${id}/reply/`,
        {
          admin_reply: replyText[id],
        }
      );

      alert("Reply sent successfully");

      fetchEnquiries();

    } catch (error) {

      console.log(error);

      alert("Failed to send reply");
    }
  };

  if (loading) {
    return <h2>Loading enquiries...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ marginBottom: "20px" }}>
        Admin Enquiries Panel
      </h2>

      {enquiries.length > 0 ? (

        enquiries.map((item) => (

          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              background: "#fff",
            }}
          >

            <h3>
              {item.listing_title}
            </h3>

            <p>
              <strong>User:</strong>{" "}
              {item.user_name || item.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {item.user_email || item.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {item.phone}
            </p>

            <p>
              <strong>Message:</strong>{" "}
              {item.message || "No message"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {item.status}
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(item.created_at).toLocaleString()}
            </p>

            {item.admin_reply && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                }}
              >
                <strong>Admin Reply:</strong>

                <p style={{ marginTop: "8px" }}>
                  {item.admin_reply}
                </p>

                {item.replied_at && (
                  <small>
                    Replied on:{" "}
                    {new Date(item.replied_at).toLocaleString()}
                  </small>
                )}
              </div>
            )}

            <div style={{ marginTop: "15px" }}>

              <textarea
                rows="4"
                placeholder="Write reply..."
                value={
                  replyText[item.id] || ""
                }
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [item.id]: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={() => sendReply(item.id)}
                style={{
                  marginTop: "10px",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#dc2626",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Send Reply
              </button>

            </div>

          </div>
        ))

      ) : (

        <h3>No enquiries found</h3>

      )}
    </div>
  );
}

export default Enquiries;