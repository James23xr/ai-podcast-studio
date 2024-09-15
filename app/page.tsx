// app/page.tsx
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { SignInButton, UserButton } from '@clerk/nextjs';
import VoiceSelector from '../components/VoiceSelector';
import ImageGenerator from '../components/ImageGenerator';
import SearchBar from '../components/SearchBar';

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to AI-Powered Podcast Platform
        </h1>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AI-Powered Podcast Platform</h1>
        <UserButton />
      </div>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <VoiceSelector />
        <ImageGenerator />
      </div>
    </div>
  );
}
