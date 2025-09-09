import axios from "axios";


const LOGS_API = "http://20.244.56.144/evaluation-service/logs";


const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjM0MWEwNWU0QGdtcml0LmVkdS5pbiIsImV4cCI6MTc1NzM5Nzg4MywiaWF0IjoxNzU3Mzk2OTgzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDk0ZTY4NjAtMzVjYi00MDc5LWIwYjItYjEyNGQ2ODY3ZmMyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGhhcmFuaSBwdWphcmkiLCJzdWIiOiJjNWUzZGYwZC1jMzM0LTQ2NDctOGUzNy0xMGE0M2I3ZWY5YzkifSwiZW1haWwiOiIyMjM0MWEwNWU0QGdtcml0LmVkdS5pbiIsIm5hbWUiOiJkaGFyYW5pIHB1amFyaSIsInJvbGxObyI6IjIyMzQxYTA1ZTQiLCJhY2Nlc3NDb2RlIjoiZWV0aE5lIiwiY2xpZW50SUQiOiJjNWUzZGYwZC1jMzM0LTQ2NDctOGUzNy0xMGE0M2I3ZWY5YzkiLCJjbGllbnRTZWNyZXQiOiJjeGNtUEJzU1J3bXdIU1NKIn0.IRqQSOLkwVqhiq9ac_2u62SVmJ3YBlUPH1OzkN-GBUk";

export async function Log(stack, level, pkg, message) {
  try {
    const res = await axios.post(
      LOGS_API,
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Log sent:", res.data);
  } catch (err) {
    console.error("❌ Failed to send log:", err.message);
  }
}
