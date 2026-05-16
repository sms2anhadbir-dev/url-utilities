from flask import Flask, request, send_file
import yt_dlp

app = Flask(__name__)

@app.route("/")
def home():

    return {
        "status": "online",
        "message": "EZLink yt-dlp backend is running"
    }

@app.route("/download")
def download():

    url = request.args.get("url")

    if not url:
        return {
            "error": "No URL provided"
        }

    output = "video.mp4"

    ydl_opts = {
        "format": "mp4",
        "outtmpl": output
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    return send_file(
        output,
        as_attachment=True
    )

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000
    )
