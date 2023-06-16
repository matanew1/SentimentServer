import pandas as pd
import sys
from nltk.sentiment.vader import SentimentIntensityAnalyzer

def extensive_sentiment_decision(corpus):
    sna = SentimentIntensityAnalyzer()
    results = []
    for sentence in corpus:
        scores = sna.polarity_scores(sentence)
        sentiment = categorize_sentiment(scores['compound'])
        results.append({'sentence': sentence, 'sentiment': sentiment, 'data': scores})
    return results

def categorize_sentiment(compound_score):
    if compound_score < -0.5:
        return 'Very sad'
    elif compound_score < 0:
        return 'Sad'
    elif compound_score == 0:
        return 'Normal'
    elif compound_score <= 0.5:
        return 'Happy'
    else:
        return 'Very happy'

def main(args):
    results = extensive_sentiment_decision(args)
    df = pd.DataFrame(results)
    df.to_json('scripts/sentiment_results.json', orient='records')
    print(results[0])

if __name__ == '__main__':
    args = sys.argv[1:]
    main(args)
