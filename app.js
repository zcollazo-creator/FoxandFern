const $ = (id) => document.getElementById(id);
const question = $('question');
let cards = [], current = 0;
const subjectIdeas = {
  Math: 'Math becomes clearer when you show each step and check whether your answer makes sense.',
  Science: 'Science is about noticing patterns, using evidence, and explaining why something happens.',
  'English / Reading': 'Strong reading answers use details from the text and explain what those details mean.',
  'History / Social Studies': 'History connects people, events, causes, and effects to help us understand change over time.',
  Other: 'Learning sticks best when you connect a new idea to something you already know.'
};
function shorten(s, n=110){ return s.length > n ? s.slice(0,n-1).trim() + '…' : s; }
function topicText(){ return question.value.trim().replace(/\s+/g,' '); }
function makeCards(topic, subject){
  const core = shorten(topic.replace(/^(what|why|how|when|where|who|can|does|do|is|are)\s+/i,''), 110);
  return [
    {q:`What is the main idea in this question?`, a:`Put it in your own words: ${core}`},
    {q:'What evidence, steps, or details would help answer it?', a: subject === 'Math' ? 'Write down what you know, choose an operation, solve one step at a time, and check your result.' : 'Look for important vocabulary, examples, facts, or clues that support your thinking.'},
    {q:'How would you explain your answer to a friend?', a:'Start with a clear claim, add a reason or example, and finish by connecting it back to the question.'}
  ];
}
function renderCard(){
  const c=cards[current]; $('flash-question').textContent=c.q; $('flash-answer').textContent=c.a; $('card-count').textContent=`${current+1} / ${cards.length}`; $('flashcard').classList.remove('flipped');
}
$('create').addEventListener('click', () => {
  const topic=topicText();
  if(!topic){ question.focus(); question.placeholder='Add a question first — any subject is welcome!'; return; }
  const subject=$('subject').value; const idea=subjectIdeas[subject] || 'Break this question into small parts, then explain each part using your own words.';
  $('guide-title').textContent=shorten(topic, 85);
  $('big-idea').textContent=subject === 'Choose for me' ? 'Find the question behind the question.' : `Think like a ${subject} learner.`;
  $('explanation').textContent=idea + ' For this question, identify what it is asking, find the key information, and make a connection.';
  $('plan').innerHTML='<li>Read the question twice. Circle key words.</li><li>Say what it is asking in your own words.</li><li>Use the flashcards, then try an answer without looking.</li>';
  $('parent-answer').textContent=`A strong response should directly answer “${shorten(topic, 135)}” and include an age-appropriate reason, step, or example. Ask your child to talk through their thinking before offering a hint.`;
  $('parent-question').textContent='“What part feels easiest to start with?” Then follow up with: “What makes you think that?”';
  cards=makeCards(topic,subject);current=0;renderCard();$('empty').classList.add('hidden');$('guide').classList.remove('hidden');$('guide').scrollIntoView({behavior:'smooth',block:'start'});
});
$('flashcard').addEventListener('click',()=> $('flashcard').classList.toggle('flipped'));
$('next').addEventListener('click',()=>{current=(current+1)%cards.length;renderCard()});
$('prev').addEventListener('click',()=>{current=(current-1+cards.length)%cards.length;renderCard()});
$('reset').addEventListener('click',()=>{question.focus();window.scrollTo({top:0,behavior:'smooth'})});
