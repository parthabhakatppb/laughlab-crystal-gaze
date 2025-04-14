export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.audioChunks = [];
      
      // Check if user has already denied permissions
      if (navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (permissionStatus.state === 'denied') {
          throw new Error("Microphone access was previously denied. Please enable it in your browser settings.");
        }
      }
      
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
      
      // Check for specific permission errors
      if (error instanceof DOMException && 
          (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError')) {
        throw new Error("Microphone access denied. Please allow microphone access in your browser settings.");
      }
      
      throw new Error("Could not access microphone. Please check your permissions and try again.");
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

  // Add a method to simulate recording for demo purposes
  async simulateRecording(): Promise<Blob> {
    console.log("Simulating recording");
    // Wait for 3 seconds to simulate recording
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create an empty audio blob
    const emptyBlob = new Blob([], { type: 'audio/wav' });
    return emptyBlob;
  }
}

export const createAudioElement = (blob: Blob): HTMLAudioElement => {
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  return audio;
};
