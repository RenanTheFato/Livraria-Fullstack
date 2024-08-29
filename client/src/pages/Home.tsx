import "../index.css";

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-stone-300">
      <header className="bg-cyan-600">
        <nav>
          <div>
            <img className="w-16" src='./src/assets/logo.svg'/>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default HomePage;
