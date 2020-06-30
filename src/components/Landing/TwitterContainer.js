import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function TwitterContainer() {
	return (
		<section className='TwitterContainer'>
			<div className='twitterEmbed  twit1'>
				<TwitterTimelineEmbed
					sourceType='profile'
					screenName='ESPNFantasy'
					options={{
						tweetLimit: '5',
						width: 'auto',
					}}
					theme='dark'
					noHeader='true'
					noBorders='true'
					noFooter='true'></TwitterTimelineEmbed>
			</div>
			<div className='twitterEmbed  twit4'>
				<TwitterTimelineEmbed
					sourceType='profile'
					screenName='PFF_Fantasy'
					options={{
						tweetLimit: '5',
						width: 'auto',
					}}
					theme='dark'
					noHeader='true'
					noBorders='true'
					noFooter='true'></TwitterTimelineEmbed>
			</div>
			<div className='twitterEmbed twit3'>
				<TwitterTimelineEmbed
					sourceType='profile'
					screenName='TheFFBallers'
					options={{
						tweetLimit: '5',
						width: 'auto',
					}}
					theme='dark'
					noHeader='true'
					noBorders='true'
					noFooter='true'></TwitterTimelineEmbed>
			</div>
			<div className='twitterEmbed twit2'>
				<TwitterTimelineEmbed
					sourceType='profile'
					screenName='FantasyPros'
					options={{
						tweetLimit: '5',
						width: 'auto',
						// height: 20,
					}}
					autoHeight='true'
					theme='dark'
					noHeader='true'
					noBorders='true'
					noFooter='true'></TwitterTimelineEmbed>
			</div>

			<div className='twitterEmbed  twit5'>
				<TwitterTimelineEmbed
					sourceType='profile'
					screenName='4for4football'
					options={{
						tweetLimit: '5',
						width: 'auto',
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
