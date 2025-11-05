export function createWelcomeEmailTemplate(name, clientURL) {
return `
<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to ChatterBox</title>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      background: #12071f;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #e5e0f7;
    ">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0"
              style="
                background: #1a0933;
                border-radius: 18px;
                margin-top: 50px;
                overflow: hidden;
                border: 1px solid rgba(200,160,255,0.2);
                box-shadow: 0 8px 35px rgba(150,100,255,0.25);
              ">

              <!-- Header -->
              <tr>
                <td align="center" style="
                  background: linear-gradient(135deg, #8b5cf6, #a855f7, #7e22ce);
                  color: white;
                  padding: 45px 20px;
                  font-size: 28px;
                  font-weight: bold;
                  letter-spacing: 1px;
                  text-shadow: 0 3px 8px rgba(0,0,0,0.4);
                ">
                  💫 Welcome to <span style="color: #f3e8ff;">ChatterBox</span> 💫
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 45px 35px; text-align: center;">
                  <h2 style="margin: 0 0 15px; color: #c084fc;">Hey ${name} 👋</h2>
                  <p style="font-size: 16px; line-height: 1.7; color: #d1c4e9;">
                    We’re so excited to have you here! <br/>
                    ChatterBox is your creative space to chat, share, and connect.
                  </p>

                  <a href="${clientURL}" style="
                    display: inline-block;
                    margin-top: 30px;
                    padding: 14px 34px;
                    background: linear-gradient(135deg, #9333ea, #a855f7);
                    border-radius: 50px;
                    color: #fff;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 16px;
                    border: 2px solid #c084fc;
                    box-shadow: 0 6px 25px rgba(147,51,234,0.4);
                    transition: all 0.3s ease;
                  " onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                    Open ChatterBox 💜
                  </a>

                  <div style="
                    margin-top: 40px;
                    border-top: 1px solid rgba(200,160,255,0.25);
                    padding-top: 20px;
                    font-size: 15px;
                    color: #b197d7;
                  ">
                    If you didn’t sign up, you can ignore this message safely.
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="
                  background: #0b0316;
                  padding: 22px;
                  color: #a78bfa;
                  font-size: 14px;
                  border-top: 1px solid rgba(200,160,255,0.15);
                ">
                  <p>© 2026 <strong style="color: #c084fc;">ChatterBox</strong>. All rights reserved.</p>
                  <p><a href="" style="color: #a855f7; text-decoration: none;">Visit Website</a></p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`}