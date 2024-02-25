from app.models import db, Movie, environment, SCHEMA
from sqlalchemy.sql import text


def seed_movies():
    movie1 =  Movie(movie_id=1139566 ,title='Through My Window 3: Looking at You', description='Raquel and Ares face the challenges that arise in this last chapter of their relationship and their individual lives.', poster_path='/pVm6aIV3mE1spi7CmC40BTCtpLS.jpg')
    movie2 =  Movie(movie_id=968051 ,title='The Nun II' , description='In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.', poster_path='/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg')
    movie3 =  Movie(movie_id=1072790 ,title='Anyone But You', description="After an amazing first date, Bea and Ben’s fiery attraction turns ice cold — until they find themselves unexpectedly reunited at a destination wedding in Australia.", poster_path='/yRt7MGBElkLQOYRvLTT1b3B1rcp.jpg')
    movie4 =  Movie(movie_id=467244 ,title="The Zone of Interest", description="The commandant of Auschwitz, Rudolf Höss, and his wife Hedwig, strive to build a dream life for their family in a house and garden next to the camp.", poster_path="/AbFtI353N2Pggl5TxfsI2VtpUt8.jpg")
    movie5 =  Movie(movie_id=1227816 ,title="Red Right Hand", description="Cash is trying to live a quiet, honest life in a small Appalachian town. When a vicious crime boss forces him back into her services,", poster_path="/vfEG79SQIg3p6B8rBLVeIo2BBhb.jpg")
    movie6 =  Movie(movie_id=693134 ,title="Dune: Part Two", description="Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family", poster_path="/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg")
    movie7 =  Movie(movie_id=787699 ,title="Wonka", description="Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.", poster_path="/qhb1qOilapbapxWQn9jtRCMwXJF.jpg")
    movie8 =  Movie(movie_id=673593 ,title="Mean Girls", description="New student Cady Heron is welcomed into the top of the social food chain by the elite group of popular girls called ‘The Plastics,’", poster_path="/fbbj3viSUDEGT1fFFMNpHP1iUjw.jpg")
    movie9 =  Movie(movie_id=438631 ,title='Dune', description="Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding", poster_path="/d5NXSklXo0qyIYkgV94XAgMIckC.jpg")
    movie10 = Movie(movie_id=994108 ,title='All of Us Strangers', description="One night in his near-empty tower block in contemporary London, Adam has a chance encounter with a mysterious neighbor Harry, which punctures the rhythm of his everyday life.", poster_path='/aviJMFZSnnCAsCVyJGaPNx4Ef3i.jpg')
    movie11 = Movie(movie_id=940551 ,title='Migration', description='After a migrating duck family alights on their pond with thrilling tales of far-flung places, the Mallard family embarks on a family road trip, from New England, to New York City, to tropical Jamaica.', poster_path='/ldfCF9RhR40mppkzmftxapaHeTo.jpg')
    movie12 = Movie(movie_id=634492 ,title='Madame Web', description='Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.', poster_path='/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg')
    movie13 = Movie(movie_id=944401 ,title='Dogman', description='A boy, bruised by life, finds his salvation through the love of his dogs.', poster_path='/rmRkZZ2aZq72dDTjbPnSLtPQcmJ.jpg')
    movie14 = Movie(movie_id=969492 ,title='Land of Bad', description="When a Delta Force special ops mission goes terribly wrong, Air Force drone pilot Reaper has 48 hours to remedy what has devolved into a wild rescue operation.", poster_path="/bIeEMMvfzgbMBtYaEWtxrFnt6Vo.jpg")
    movie15 = Movie(movie_id=838209 ,title='Exhuma', description="After suffering from serial paranormal events, a wealthy family living in LA summons a young rising shaman duo Hwa-rim and Bong-gil to save the newborn of the family. ", poster_path='/5khn1VQlW5gy85vh370MlAxLZsX.jpg')
    movie16 = Movie(movie_id=760774 ,title='One Life', description="British stockbroker Nicholas Winton visits Czechoslovakia in the 1930s and forms plans to assist in the rescue of Jewish children before the onset of World War II", poster_path='/yvnIWt2j8VnDgwKJE2VMiFMa2Qo.jpg')
    movie17 = Movie(movie_id=872585 ,title='Oppenheimer', description="The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.", poster_path='/ptpr0kGAckfQkJeJIt8st5dglvd.jpg')
    movie18 = Movie(movie_id=866398 ,title='The Beekeeper', description="One man’s campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.", poster_path='/A7EByudX0eOzlkQ2FIbogzyazm2.jpg')
    movie19 = Movie(movie_id=496243 ,title='Parasite', description="All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.", poster_path='/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg')
    movie20 = Movie(movie_id=915935 ,title='Anatomy of a Fall', description="A woman is suspected of her husband’s murder, and their blind son faces a moral dilemma as the sole witness.", poster_path="/kQs6keheMwCxJxrzV83VUwFtHkB.jpg")

    db.session.add(movie1)
    db.session.add(movie2)
    db.session.add(movie3)
    db.session.add(movie4)
    db.session.add(movie5)
    db.session.add(movie6)
    db.session.add(movie7)
    db.session.add(movie8)
    db.session.add(movie9)
    db.session.add(movie10)
    db.session.add(movie11)
    db.session.add(movie12)
    db.session.add(movie13)
    db.session.add(movie14)
    db.session.add(movie15)
    db.session.add(movie16)
    db.session.add(movie17)
    db.session.add(movie18)
    db.session.add(movie19)
    db.session.add(movie20)
    db.session.commit()

def undo_movies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))
        
    db.session.commit()
