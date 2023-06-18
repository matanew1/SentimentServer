from transformers import BartTokenizer, BartForConditionalGeneration
import sys 
import torch

def summarize_text(text, min_length, max_length):
    # Load pretrained BART model and tokenizer
    model_name = 'facebook/bart-large-cnn'
    tokenizer = BartTokenizer.from_pretrained(model_name)
    model = BartForConditionalGeneration.from_pretrained(model_name)

    # Move model and inputs to GPU
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    inputs = tokenizer([text], max_length=1024, truncation=True, return_tensors='pt').to(device)

    # Generate the summary
    summary_ids = model.generate(inputs['input_ids'], num_beams=4, length_penalty=2.0, max_length=max_length, min_length=min_length)
    summary = tokenizer.decode(summary_ids.squeeze(), skip_special_tokens=True)

    return summary


def main(args):
    if len(args) > 0:
        text = args[0]  # Extract the text from the args list
        if len(args) == 3:
            min_length = args[1] # Get the minimum length
            max_length = args[2] # Get the maximum
            summary = summarize_text(text, int(min_length), int(max_length))
        else:
            summary = summarize_text(text, 50, 150)
        print(summary)
    else:
        print('Not found results...')

if __name__ == '__main__':
    args = sys.argv[1:]
    main(args)
