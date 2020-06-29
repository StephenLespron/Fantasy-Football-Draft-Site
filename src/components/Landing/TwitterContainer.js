import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function TwitterContainer() {
	return (
		<section className='TwitterContainer'>
			<div className='twitterEmbed'>
				<TwitterTimelineEmbed
					sourceType='profile'
					screenName='FantasyPros'
					options={{
						tweetLimit: '1',
						height: '300px',
					}}
					autoHeight='true'
					theme='dark'
					noHeader='true'
					noBorders='true'
					noFooter='true'></TwitterTimelineEmbed>
			</div>
			<div className='twitterEmbed'>
				<TwitterTimelineEmbed
					sourceType='profile'
					screenName='TheFFBallers'
					options={{
						tweetLimit: '1',
						width: '50px',
					}}
					theme='dark'
					noHeader='true'
					noBorders='true'
					noFooter='true'></TwitterTimelineEmbed>
			</div>
		</section>
	);
}

export default TwitterContainer;
