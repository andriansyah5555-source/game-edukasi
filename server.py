import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        print(f"[RPG Server] {self.address_string()} - {format % args}")

def run_server():
    os.chdir(DIRECTORY)
    httpd = None
    port = PORT
    for p in [8080, 8081, 8082, 8000, 3000]:
        try:
            httpd = socketserver.TCPServer(("", p), Handler)
            port = p
            break
        except OSError:
            continue
    if not httpd:
        httpd = socketserver.TCPServer(("", 0), Handler)
        port = httpd.server_address[1]

    with httpd:
        url = f"http://localhost:{port}/index.html"
        print("=" * 60)
        print("🗡️  STRIKE & LOOT: FANTASY IDLE RPG (PIXEL SLAYER SAGA)")
        print(f"🚀  Game server aktif di: {url}")
        print("💡  Membuka browser otomatis... Tekan Ctrl+C untuk berhenti.")
        print("=" * 60)
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server dihentikan. Selamat bertualang!")
            httpd.server_close()

if __name__ == "__main__":
    run_server()
