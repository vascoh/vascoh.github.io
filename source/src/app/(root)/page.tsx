/**
 * Entry point "/". English is the default language; a previously chosen language
 * (stored when the visitor switches) is respected. Works on any static host.
 */
export default function RootPage() {
  const script = `(function(){var l='en';try{if(localStorage.getItem('lang')==='pt')l='pt'}catch(e){}location.replace('/'+l+'/'+location.hash)})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </noscript>
      <main style={{ padding: "4rem 1rem", textAlign: "center", fontFamily: "system-ui" }}>
        <a href="/en/">English</a> · <a href="/pt/">Português</a>
      </main>
    </>
  );
}
