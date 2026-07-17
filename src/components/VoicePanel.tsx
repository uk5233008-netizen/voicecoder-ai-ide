    import { useState, useRef } from "react";
    import { askGemini } from "../lib/gemini";

    export default function VoicePanel({ onCodeGenerated }: { onCodeGenerated: (code: string) => void }) {
      const [isListening, setIsListening] = useState(false);
      const [transcript, setTranscript] = useState("");
      const recognitionRef = useRef<any>(null);

      const startListening = () => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognition) {
          alert("Please use Chrome or Edge for voice input");
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = async (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          const code = await askGemini(text);
          onCodeGenerated(code);
        };

        recognition.start();
        recognitionRef.current = recognition;
      };

      return (
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
          <button
            onClick={startListening}
            className="w-full py-3 rounded-lg font-bold bg-blue-600 hover:bg-blue-700"
          >
            {isListening? "🔴 Listening..." : "🎤 Click to Speak"}
          </button>
          
          {transcript && (
            <p className="mt-3 text-sm text-gray-300">You said: "{transcript}"</p>
          )}
        </div>
      );
    }