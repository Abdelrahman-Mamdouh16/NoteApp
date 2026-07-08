  
export const emailHTML = (confirmUrl) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Confirm Your Email</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #f4f4f4;
      font-family: Arial, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding: 40px 20px;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background: #ffffff;
              border-radius: 10px;
              padding: 40px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            "
          >
            <tr>
              <td align="center">
                <h1 style="color:#333;margin-bottom:10px;">
                  Welcome to Note App 👋
                </h1>

                <p
                  style="
                    color:#666;
                    font-size:16px;
                    line-height:1.6;
                  "
                >
                  Thank you for signing up! Please confirm your email address by
                  clicking the button below.
                </p>

                <a
                  href="${confirmUrl}"
                  style="
                    display:inline-block;
                    margin:30px 0;
                    padding:14px 32px;
                    background:#4f46e5;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-size:16px;
                    font-weight:bold;
                  "
                >
                  Confirm Email
                </a>

                <p
                  style="
                    color:#888;
                    font-size:14px;
                  "
                >
                  If the button doesn't work, copy and paste this link into your
                  browser:
                </p>

                <p style="word-break:break-all;">
                  <a
                    href="${confirmUrl}"
                    style="color:#4f46e5;text-decoration:none;"
                  >
                    ${confirmUrl}
                  </a>
                </p>

                <hr
                  style="
                    border:none;
                    border-top:1px solid #eee;
                    margin:30px 0;
                  "
                />

                <p
                  style="
                    font-size:12px;
                    color:#999;
                  "
                >
                  If you didn't create an account, you can safely ignore this
                  email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;