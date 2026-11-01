import { useState } from "react";

function CookieBanner() {
  const [visible, setVisible] = useState(
    localStorage.getItem("cookie-info-closed") !== "true",
  );

  function closeBanner() {
    localStorage.setItem("cookie-info-closed", "true");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-4 text-center z-50">
      <p>
        Webshopen använder en nödvändig cookie för att hålla dig inloggad.
        Cookien behövs för webbplatsens inloggningsfunktion och används inte för
        marknadsföring.
      </p>

      <button
        type="button"
        onClick={closeBanner}
        className="mt-2 border rounded px-3 py-1 cursor-pointer"
      >
        Stäng
      </button>
    </div>
  );
}

export default CookieBanner;
