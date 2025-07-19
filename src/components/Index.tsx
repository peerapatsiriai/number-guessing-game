import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';


const Index = () => {
  const [answerNumber, setAnswerNumber] = useState(1234);
  const [inputValue, setInputValue] = useState(''); 
  const [isVisible, setIsVisible] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [showWinDialog, setShowWinDialog] = useState(false);
  const [matchingDigits, setMatchingDigits] = useState(0);

  const randomAnswerNumber = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    setAnswerNumber(randomNum);
  };

  const resetGame = () => {
    setInputValue('');
    setGuessCount(0);
    setMatchingDigits(0);
    setShowWinDialog(false);
    setIsVisible(false);
    randomAnswerNumber();
  };

  useEffect(() => {
    // Generate a random 4-digit number when the component mounts
    randomAnswerNumber();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 4) {
      setInputValue(value);
    }
  };

  // Function to compare input with display number and count matching digits
  const getMatchingDigitsCount = () => {
    const displayStr = answerNumber.toString().padStart(4, '0');
    const inputStr = inputValue.padStart(4, '0');
    let matches = 0;
    
    for (let i = 0; i < 4; i++) {
      if (displayStr[i] === inputStr[i]) {
        matches++;
      }
    }

    return matches;
  };

  useEffect(() => {
    if (inputValue.length === 4) {
      const matches = getMatchingDigitsCount();
      setMatchingDigits(matches);
      setGuessCount(prev => prev + 1);
      setInputValue(''); // Clear input after each guess
      
      // Check if player won (all 4 digits match)
      if (matches === 4) {
        setShowWinDialog(true);
      }
    }
  }, [inputValue]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="sketch-container w-full max-w-2xl p-12 text-center">
        {/* Hand-drawn title */}
        <h1 className="font-kalam text-3xl font-bold mb-4 text-foreground">
          Number Display
        </h1>
        
        {/* Large number display with eye icon */}
        <div className="mb-12">
          <div className="p-8 bg-card relative">
            <div className="flex items-center justify-center gap-6">
              <div className="number-display text-8xl md:text-9xl font-mono font-bold">
                {isVisible ? answerNumber.toString().padStart(4, '0') : '••••'}
              </div>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="p-3 rounded-lg border-2 border-border bg-background hover:bg-muted transition-colors"
              >
                {isVisible ? (
                  <Eye size={32} className="text-foreground" />
                ) : (
                  <EyeOff size={32} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Input section */}
        <div className="space-y-4">
          <label className="block font-kalam text-lg text-muted-foreground">
            Enter 4-digit number
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="0000"
            maxLength={4}
            className="sketch-input w-full text-center text-2xl py-4 px-6 focus:border-black focus:outline-none"
          />
          <div className="text-sm text-muted-foreground font-kalam">
            {inputValue.length}/4 digits
          </div>
        </div>

        {/* Matching digits message */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border-2 border-border">
          <div className="font-kalam text-lg">
            <span className="text-muted-foreground">Matching digits: </span>
            <span className="text-foreground font-bold">{matchingDigits}/4</span>
          </div>
          {/* <div className="text-sm text-muted-foreground mt-1">
            Input: {inputValue.padStart(4, '0')} | Display: {answerNumber.toString().padStart(4, '0')}
          </div> */}
          <div className="text-sm text-muted-foreground mt-1">
            Guessing: {guessCount} Time 
          </div>
        </div>

        {/* Decorative sketch elements */}
        <div className="mt-6 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
      </div>

      {/* Win Dialog */}
      <Dialog open={showWinDialog} onOpenChange={setShowWinDialog}>
        <DialogContent className="text-center">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-primary text-center"> Congratulations! </DialogTitle>
            <DialogDescription className="text-lg mt-4 text-center">
              You guessed all 4 digits correctly!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-lg font-semibold">Guess: {guessCount} Time</p>
            <p className="text-sm text-muted-foreground mt-2">
              The number was: <span className="font-bold text-black">{answerNumber.toString().padStart(4, '0')}</span>
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={resetGame}>
              Play Again
            </Button>
            <Button variant="outline" onClick={() => setShowWinDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Index;
