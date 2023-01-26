import React, { useState } from "react";
import "./index.css";

const DisclaimerModal = () => {
  return (
    <>
      <div className="disclaimer">
        <div className="disclaimer-content">
          <p>
            The information provided by Nanny Express Service LLC. on{" "}
            <a>nannydeal.com</a> is for general public informational purpose
            only. We make no representation or warranty of any kind, express or
            implied, regarding the accuracy, adequacy, validaity, reliability,
            availability or completeness of any information on the{" "}
            <a>nannydeal.com</a>.
          </p>
          <p>
            <a>Nannydeal.com</a> is an online website for sharing home-related
            service experience. <a>Nannydeal.com</a> do not endorse, represent,
            support or guarantee the accuracy, completeness or reliability of
            any content or communications posted on this website. In no event
            shall Nannydeal.com be liable for any loss or damage including
            without limitation, indirect or consequential loss or damage from
            using this website.
          </p>
          <h3>What are the cookies used for?</h3>
          <p>
            Cookies could be used to recognize you when you visit{" "}
            <a>Nannydeal.com</a>, remember your preference, and give you
            personalized experience that's in line with your setting. Cookies
            also make your interactions with <a>Nannydeal.com</a> faster and
            more secure.
          </p>
        </div>
        <table className="disclaimer-table">
          <tr>
            <th>Categories of Cookie Usage</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>Authentication</td>
            <td>
              If you're signed in to Nannydeal.com, cookies help us show you the
              right information and personalize your experience.
            </td>
          </tr>
          <tr>
            <td>Security</td>
            <td>
              We use cookies to enable and support our security features, and to
              help us detect malicious activity and violations of your User
              Agreement.
            </td>
          </tr>
          <tr>
            <td>Preferences, features, services</td>
            <td>
              Cookies can tell us which language you prefer and what your
              communications preferences are. They can help you fill out forms
              on LinkedIn more easily. They also provide you with features,
              insights, and customized content in conjunction with your plugins.
              You can learn more about plugins in our Privacy Policy.
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default DisclaimerModal;
