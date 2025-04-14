
export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.audioChunks = [];
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      
      this.mediaRecorder.start();
      console.log("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
      throw new Error("Could not access microphone. Please check your permissions.");
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error("Recording hasn't started"));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.cleanUp();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
      console.log("Recording stopped");
    });
  }

  private cleanUp(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
  }

  isRecording(): boolean {
    return this.mediaRecorder !== null && this.mediaRecorder.state === 'recording';
  }
}

export const createAudioElement = (blob: Blob): HTMLAudioElement => {
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  return audio;
};
