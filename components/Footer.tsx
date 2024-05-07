export default function Footer() {
  return (
    <footer className="flex justify-center w-full p-8 text-xs text-center border-t border-t-foreground/10">
      <div className="container">
        <p>Remember It! | &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
