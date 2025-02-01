export default function Voting() {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Upvote Spots</h2>
        <p className="text-gray-600">Vote for your favorite spots below:</p>
        <button className="mt-4 w-full bg-yellow-500 text-white p-2 rounded-lg">
          Upvote Spot A
        </button>
        <button className="mt-2 w-full bg-yellow-500 text-white p-2 rounded-lg">
          Upvote Spot B
        </button>
      </div>
    );
  }