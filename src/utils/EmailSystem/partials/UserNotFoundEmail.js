 const registerUrl = "http://localhost:3000/register";
export const UserNotFoundEmail = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Account Not Found</title>
  </head>
  <body
    style="
      margin:0;
      padding:0;
      background:#f4f4f4;
      font-family:Arial,sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding:40px 20px;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#ffffff;
              border-radius:10px;
              padding:40px;
              box-shadow:0 2px 10px rgba(0,0,0,.1);
            "
          >
            <tr>
              <td align="center">
                <h1
                  style="
                    color:#dc2626;
                    margin-bottom:10px;
                  "
                >
                  404 - Account Not Found
                </h1>

                <p
                  style="
                    color:#555;
                    font-size:16px;
                    line-height:1.6;
                  "
                >
                  We couldn't find an account associated with this email address.
                </p>

                <p
                  style="
                    color:#555;
                    font-size:16px;
                    line-height:1.6;
                  "
                >
                  If you haven't created an account yet, you can sign up by
                  clicking the button below.
                </p>

                <a
                  href="${registerUrl}"
                  style="
                    display:inline-block;
                    margin:30px 0;
                    padding:14px 32px;
                    background:#4F46E5;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-size:16px;
                    font-weight:bold;
                  "
                >
                  Create Account
                </a>

                <p
                  style="
                    color:#888;
                    font-size:14px;
                    margin-top:20px;
                  "
                >
                  Or copy and paste this link into your browser:
                </p>

                <p style="word-break:break-all;">
                  <a
                    href="${registerUrl}"
                    style="
                      color:#4F46E5;
                      text-decoration:none;
                    "
                  >
                    ${registerUrl}
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
                    color:#999;
                    font-size:13px;
                  "
                >
                  If you believe this is a mistake, please contact our support team.
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