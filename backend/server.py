from flask import Flask, request, send_file, jsonify
import yt_dlp
import os
import glob

app = Flask(__name__)

@app.route("/")
def home():

    return jsonify({
        "status": "online",
        "message": "EZLink yt-dlp backend running"
    })

@app.route("/download")
def download():

    url = request.args.get("url")
    mode = request.args.get("mode", "video")

    if not url:

        return jsonify({
            "error": "No URL provided"
        }), 400

    # DELETE OLD FILES

    for file in glob.glob("video*"):
        try:
            os.remove(file)
        except:
            pass

    for file in glob.glob("audio*"):
        try:
            os.remove(file)
        except:
            pass

    # AUDIO ONLY

    if mode == "audio":

        output = "audio.%(ext)s"

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
                "preferredquality": "320"
            }]
        }

    # VIDEO ONLY

    elif mode == "videoonly":

        output = "video_only.%(ext)s"

        ydl_opts = {
            "format": "bestvideo/best",
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

    # FULL VIDEO + AUDIO

    else:

        output = "video.%(ext)s"

        ydl_opts = {
            "format": "bestvideo+bestaudio/best",
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

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:

            info = ydl.extract_info(
                url,
                download=True
            )

            filename = ydl.prepare_filename(info)

            # MP3 FIX

            if mode == "audio":

                filename = os.path.splitext(filename)[0] + ".mp3"

        return send_file(
            filename,
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
