from flask import Flask, request, send_file, jsonify
import yt_dlp
import os

app = Flask(__name__)

@app.route("/")
def home():

    return {
        "status": "online",
        "message": "EZLink backend running"
    }

@app.route("/download")
def download():

    url = request.args.get("url")
    mode = request.args.get("mode", "video")

    if not url:
        return jsonify({
            "error": "No URL provided"
        }), 400

    if mode == "audio":
        output = "audio.mp3"

        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": output,
            "noplaylist": True,
            "quiet": True,
            "no_warnings": True,
            "cookiefile": "cookies.txt",
            "extractor_args": {
                "youtube": {
                    "player_client": ["android"]
                }
            },
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192"
            }]
        }

    elif mode == "videoonly":
        output = "video_only.mp4"

        ydl_opts = {
            "format": "bestvideo[ext=mp4]",
            "outtmpl": output,
            "noplaylist": True,
            "quiet": True,
            "no_warnings": True,
            "cookiefile": "cookies.txt",
            "extractor_args": {
                "youtube": {
                    "player_client": ["android"]
                }
            }
        }

    else:
        output = "video.mp4"

        ydl_opts = {
            "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
            "outtmpl": output,
            "merge_output_format": "mp4",
            "noplaylist": True,
            "quiet": True,
            "no_warnings": True,
            "cookiefile": "cookies.txt",
            "extractor_args": {
                "youtube": {
                    "player_client": ["android"]
                }
            }
        }

    try:

        if os.path.exists(output):
            os.remove(output)

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        return send_file(
            output,
            as_attachment=True
        )

    except Exception as e:

        return jsonify({
            "error": "Download failed",
            "details": str(e)
        }), 500

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000
    )
