import Tweet from '../Tweet';

const TweetList = ({ tweets, displayName }) => {
    return (
        <div className="tweetList">
            {tweets?.map((tweet) => (
                <Tweet
                    tweet={tweet}
                    displayName={displayName}
                    key={tweet._id}
                />
            ))}
        </div>
    );
};

export default TweetList;
